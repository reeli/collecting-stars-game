import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import {Configuration} from "webpack";

export = (_: any, argv: any) => {
  const mode = argv.mode || "development";

  return {
    mode,
    context: path.resolve(__dirname, "./src"),
    entry: "./index.ts",
    devServer: {
      port: 8888,
    },
    devtool: mode === "development" ? "eval-source-map" : undefined,
    module:
        {
          rules: [
            {
              test: /.ts$/,
              use: {
                loader: "babel-loader"
              },
              exclude: /node_modules/,
            },
            {
              test: /\.(gif|png|jpe?g|svg|xml)$/i,
              loader: "file-loader",
              options: {
                name: "assets/[name].[ext]",
              },
            },
          ]
        }
    ,
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html"
      })
    ],
    resolve: {
      modules: [__dirname, "node_modules"],
      extensions: [".ts", ".js", ".json"],
    },
  } as Configuration;
}
