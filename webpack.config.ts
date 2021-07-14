import ForkTSCheckerPlugin from "fork-ts-checker-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CSSMinimizerPlugin from "css-minimizer-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import path from "path";

const isDevelopment = process.env["NODE_ENV"] !== "production";

// @ts-ignore
const config: Configuration = {
  mode: isDevelopment ? "development" : "production",

  devtool: isDevelopment ? "eval-cheap-source-map" : false,

  // Enable this for source-map debugging:
  // devtool: isDevelopment ? 'eval-source-map' : false,

  // for ForkTSCheckerPlugin to automatically find tsconfig.json
  context: __dirname,

  entry: "./src/index.tsx",
  output: {
    publicPath: isDevelopment ? "/" : "",
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[chunkhash].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      "...",
      // @ts-ignore
      new CSSMinimizerPlugin(),
    ],
  },

  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          // disable type checker (checked in ForkTSCheckerPlugin)
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },

  // @ts-ignore (seems that `devServer` is not part of @types/webpack)
  devServer: {
    historyApiFallback: true,

    quiet: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },

  // 1.5mo for max asset size sounds more reasonable than the unreachable 244kb defaults lol
  performance: {
    maxEntrypointSize: 1500000,
    maxAssetSize: 1500000,
  },

  plugins: [
    new ForkTSCheckerPlugin(),
    // @ts-ignore
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      // favicon: './src/assets/favicon.ico',
    }),
    // @ts-ignore
    ...(isDevelopment
      ? [new HotModuleReplacementPlugin(), new ReactRefreshPlugin()]
      : []),
  ],
};

export default config;
