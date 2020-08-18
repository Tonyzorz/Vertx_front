'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'src/assets',
    assetsPublicPath: '/',
    proxyTable: {
      // '/movies': {
      //   target: 'http://192.168.11.6:3000/movies',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/movies': ''
      //   }
      // },
      '/find': {
        target: 'http://127.0.0.1:18090/find',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '/find': ''
        }
      },
      '/propertyfind': {
        target: 'http://127.0.0.1:18090/propertyfind',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '/propertyfind': ''
        }
      },
      '/instancefind': {
        target: 'http://127.0.0.1:18090/instancefind',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '/instancefind': ''
        }
      },
      '/find/:queryId': {
        target: 'http://127.0.0.1:18090/find/:queryId',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '/find': ''
        }
      },
      '/propertyfind/:id': {
        target: 'http://127.0.0.1:18090/propertyfind/:id',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '/propertyfind': ''
        }
      },
      '/instancefind/:id/:role/:role_instance_id': {
        target: 'http://127.0.0.1:18090/instancefind/:id/:role/:role_instance_id',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '/instancefind': ''
        }
      },
      '/instancefind/:id': {
        target: 'http://127.0.0.1:18090/instancefind/:id',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '/instancefind': ''
        }
      },
      '/delete': {
        target: 'http://127.0.0.1:18090/delete/:queryId',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '^/delete': ''
        }
      },
      '/propertyDelete': {
        target: 'http://127.0.0.1:18090/propertyDelete/:id',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '^/propertyDelete': ''
        }
      },
      '/instanceDelete': {
        target: 'http://127.0.0.1:18090/instanceDelete/:id',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '^/instanceDelete': ''
        }
      },
      '/queryInsert': {
        target: 'http://127.0.0.1:18090/queryInsert',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '^/queryInsert': ''
        }
      },
      '/propertyInsert': {
        target: 'http://127.0.0.1:18090/propertyInsert',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '^/propertyInsert': ''
        }
      },
      '/instanceInsert': {
        target: 'http://127.0.0.1:18090/instanceInsert',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '^/instanceInsert': ''
        }
      },
      '/queryUpdate': {
        target: 'http://127.0.0.1:18090/queryUpdate',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '^/queryUpdate': ''
        }
      },
      '/propertyUpdate': {
        target: 'http://127.0.0.1:18090/propertyUpdate',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '^/propertyUpdate': ''
        }
      },
      '/instanceUpdate': {
        target: 'http://127.0.0.1:18090/instanceUpdate',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '^/instanceUpdate': ''
        }
      },
      '/headerData': {
        target: 'http://127.0.0.1:18090/headerData',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '^/headerData': ''
        }
      },
      '/querySearch': {
        target: 'http://127.0.0.1:18090/querySearch',
        headers: {Connection: 'keep-alive'},
        changeOrigin: true,
        pathRewrite: {
          '^/querySearch': ''
        }
      }
    },

    // Various Dev Server settings
    host: '192.168.11.2', // can be overwritten by process.env.HOST
    port: 5050, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
