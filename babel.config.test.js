module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  // For absolute imports
  plugins: ['babel-plugin-tsconfig-paths-module-resolver'],
};
