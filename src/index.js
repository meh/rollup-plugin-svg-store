import fs from 'fs-extra';
import path from 'path';
import { createFilter } from 'rollup-pluginutils';
import glob from 'glob';

import SVGStore from 'svgstore';
import SVGO from 'svgo';

export default function store(options = {}) {
	const filter = createFilter(options.include, options.exclude);
	const generated = new Map();
	
	return {
		name: 'rollup-plugin-svg-store',

		async resolveId(importee, importer) {
			if (!filter(importer) || !importee.includes('*') || !importee.endsWith(".svg")) {
				return null;
			}

			let files = glob.sync(importee, { cwd: path.dirname(importer) });

			if (options.intercept) {
				files = options.intercept(files.slice(), importee, importer);
			}

			const store = SVGStore(options.store || {});
			for (const file of files) {
				const id = path.parse(file).name;
				const code = await fs.readFile(file, { encoding: 'utf-8' });

				const optimized = await new SVGO({
					plugins: [
						{ removeViewBox: false },
						{ reusePaths: true },
						{ prefixIds: true,
							delim: '-',
							prefix: id },

						...(options.optimize || [])
					]
				}).optimize(code, { path: file });

				store.add(`${options.prefix}${id}`, optimized.data);
			}

			const id = path.join(path.dirname(importer),
				importee.replace(/\W/g, (c) => `_${c.codePointAt(0)}_`));

			generated.set(id, store.toString({ inline: true }));

			return id;
		},

		async load(id) {
			if (!generated.get(id)) {
				return null;
			}

			return {
				code: `export default ${JSON.stringify(generated.get(id))}`,
				map: { mappings: '' }
			};
		}
	}
}
