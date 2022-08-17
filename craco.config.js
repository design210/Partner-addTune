const path = require('path')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.paths.json')
const CarcoAlias = require('craco-alias')
const CracoEnvPlugin = require('craco-plugin-env')

module.exports = {
  jest: {
    configure: {
      preset: 'ts-jest',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src/',
      }),
    },
  },
  plugins: [
    {
      plugin: CarcoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: {},
      },
    },
  ],
}
