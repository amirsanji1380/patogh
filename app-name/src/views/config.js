System.config({
    transpiler: 'plugin-babel',
    meta: {
      '*.vue': {
        loader: 'vue-loader'
      },
    },
    paths: {
      'npm:': 'https://unpkg.com/'
    },
    map: {
      'vue': 'npm:vue@2.6.3/dist/vue.esm.browser.js',
      'vue-loader': 'npm:dx-systemjs-vue-browser@latest/index.js',
      'devextreme': 'npm:devextreme@19.2',
      'devextreme-vue': 'npm:devextreme-vue@19.2',
      'jszip': 'npm:jszip@3.1.3/dist/jszip.min.js',
      'quill': 'npm:quill@1.3.7/dist/quill.js',
      'devexpress-diagram': 'npm:devexpress-diagram@0.1.53',
      'devexpress-gantt': 'npm:devexpress-gantt@0.0.27',
      'plugin-babel': 'npm:systemjs-plugin-babel@0/plugin-babel.js',
      'systemjs-babel-build': 'npm:systemjs-plugin-babel@0/systemjs-babel-browser.js'
    },
    packages: {
      'devextreme-vue': {
        main: 'index.js'
      },
      'devextreme': {
        defaultExtension: 'js'
      },
    },
    babelOptions: {
      sourceMaps: false,
      stage0: true
    }
  });
  