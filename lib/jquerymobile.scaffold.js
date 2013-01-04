var path = require( "path" );

module.exports = function( _, anvil ) {

  var root = path.resolve( __dirname, "../" );

  anvil.scaffold( {
        type: "jqm:init",
        description: "Creates a bare bones jQuery Mobile application folder structure.",
        prompt: [{
          name: "minified",
          description: "Do you want to use the minified version? (yes/no)",
          required: false,
          "default": "no"
        }],
        output: {
            src : {
              js: {
                vendor: {
                  "jquery.js": function( data, done ) {
                    var minified = ( data.minified == "yes" ) ? ".min" : "";
                    anvil.fs.read( root + "/lib/templates/js/vendor/jquery" + minified + ".js", done );
                  },
                  "jquery.mobile.js": function( data, done ) {
                                                              var minified = ( data.minified == "yes" ) ? ".min" : "";
                                                              anvil.fs.read( root + "/lib/templates/js/vendor/jquery.mobile-" + minified + ".js", done );
                                                            }
                },
                "main.js": anvil.scaffold.file( root + "/lib/templates/js/main.js")
              },
              css: {
                vendor: {
                  "jquery.mobile.css": function( data, done ) {
                                        var minified = ( data.minified == "yes" ) ? ".min" : "";
                                        anvil.fs.read( root + "/lib/templates/css/vendor/jquery.mobile" + minified + ".css", done );
                                       }
                },
                "style.css": anvil.scaffold.file( root + "/lib/templates/css/style.css")
              },
              images: function( data, done ) {
                  anvil.fs.copyDirectory( root + "/src/templates/images", root + "/lib/templates/images", done );
              },
              "index.html": anvil.scaffold.file( root + "/lib/templates/html/index.html")
            }
        }
    });
};