const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use:  [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
        title: 'Webpack template for Animation',
        template: 'index.html'
      }
    ),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    })
  ]
}