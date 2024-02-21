import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | 'development';

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  const isDev = env.mode === 'development';

  const config: webpack.Configuration = {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      new webpack.ProgressPlugin(),
    ],
    module: {
      rules: [
        // порядок имеет значение!
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates 'style' nodes from JS strings
            "style-loader",
            // Translates css into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ]
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev ? {
      port: env.port ?? 5000,
      open: true,
    } : undefined
  };

  return config;
};
