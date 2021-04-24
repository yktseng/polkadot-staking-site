const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const config = {
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    resolve: {
      // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
      extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [ // fixes https://github.com/graphql/graphql-js/issues/1272
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        },
      ]
    }
  }
 }
 
 module.exports = config