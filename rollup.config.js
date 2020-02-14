import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
module.exports = {
  input: './packages/index.js',
  external: [
    "reacst",
    "html5parser-fork",
    "string-hash"
  ],
  output: {
    file: 'lib/index.min.js',
    format: 'cjs'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      preferBuiltins: true
    })
  ]
};