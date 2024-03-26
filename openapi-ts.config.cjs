/** @type {import('@hey-api/openapi-ts').UserConfig} */
module.exports = {
  input: './mangadex-api.yaml',
  output: './mangadex-client',
  useOptions: true,
  client: 'fetch',
};