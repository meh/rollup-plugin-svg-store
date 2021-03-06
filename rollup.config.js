export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/index.js', format: 'cjs' },
    { file: 'dist/index.mjs', format: 'es' }
  ],
  external: ['path', 'fs-extra', 'svgstore', 'svgo', 'glob'],
  plugins: []
};
