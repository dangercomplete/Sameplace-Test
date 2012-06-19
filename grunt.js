module.exports = function(grunt) {
  grunt.initConfig({
    server: {
      index: "./index_development.html",
      files: { "favicon.ico": "favicon.ico", "release":"./index.html"},
      folders: {
        "js": "js",
        "less": "less",
        "bootstrap": "bootstrap",
        "img":"img"
      }
    },
    concat: {
      "./dist/debug/require.js": [
        "./js/lib/require.js",
        "./dist/debug/app.js"
      ]
    },
    mincss: {
      "./dist/release/main.css": [
        "./dist/debug/main.css"
      ]
    },
    clean: ["./dist/"],
    lint: {
      files: [
        "./js/*.js", "./js/plugins/*.js"
      ]
    },
    less: {
      compile: {
        files: {
          "./dist/debug/main.css": "./less/main.less"
        },
        options: {
          paths: ["./less"]
        }
      }
    },
    min: {
      "./dist/release/require.js": [
        "./dist/debug/require.js"
      ]
    },
    requirejs: {
      // Include the main configuration file
      mainConfigFile: "./js/config.js",
      // Output file
      out: "./dist/debug/app.js",
      // Root application module
      name: "config",
      // Do not wrap everything in an IIFE
      wrap: false
    },
  });
  grunt.registerTask("default", "clean lint requirejs concat less");
  grunt.registerTask("debug", "default");
  grunt.registerTask("release", "default min mincss");
}