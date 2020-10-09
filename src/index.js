import fs from 'fs-extra';
import path from 'path';
import { createFilter } from 'rollup-pluginutils';

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

			let files = await glob(importee, { cwd: path.dirname(importer) });
			if (options.intercept) {
				files = options.intercept(files.slice(), importee, importer);
			}

			const store = SVGStore(options.store || {});
			for (const file of files) {
				const path = path.join(dir, file);
				const id = path.parse(file).name;
				const code = fs.readFileSync(path, { encoding: 'utf-8' });

				store.add(id, code);
			}
			
			const optimizer = new SVGO(options.optimize || {});
			const optimized = await optimizer.optimize(store.toString({ inline: true }), { path: "" });

			const id = path.join(importerDirectory,
				importee.replace(/\W/g, (c) => `_${c.codePointAt(0)}_`));

			generated.set(id, optimized);
			return id;
		},

		async load(id) {
			return generated.get(id);
		}
	}
}
