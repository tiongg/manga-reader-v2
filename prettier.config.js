/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  singleQuote: true,
  semi: true,
  endOfLine: 'lf',
  tabWidth: 2,
  trailingComma: 'es5',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  // TODO(TG): Maybe can make default imports be higher
  importOrder: [
    '^(react/(.*)$)|^(react$)', // React
    '^(react-native/(.*)$)|^(react-native$)', // React native
    '<BUILTIN_MODULES>', // Nodejs built ins
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups
    '', // To add spacing between the 2
    '@\/(.*)Page$',
    '',
    '@\/(.*)$',
    '^[./]', //Relative imports
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
};
