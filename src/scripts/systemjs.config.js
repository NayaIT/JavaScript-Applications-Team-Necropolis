System.config({
    transpiler: "babel",
    babelOptions: {
        optional: ["runtime"]
    },
    map: {
        babel: 'node_modules/babel-core/browser.js',
        jquery: 'node_modules/jquery/dist/jquery.js'
    }
});
