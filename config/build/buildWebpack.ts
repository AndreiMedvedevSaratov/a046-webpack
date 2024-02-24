import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildPlugins } from './buildPlugins';
import { BuildOptions } from './types/types';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === 'development';

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}