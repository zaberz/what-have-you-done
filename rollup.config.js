import resolve from 'rollup-plugin-node-resolve';
import babel from "rollup-plugin-babel";

export default [{
  input: ['src/index.js'],
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'WHTD',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}, {
  input: ['src/fireEvent.js'],
  output: {
    file: 'dist/fireEvent.js',
    format: 'umd',
    name: 'FIREEVENT'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}];

