module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      options: {
        separator: ";",
      },
      dist: {
        src: ["client/js/vendor/*.js", "client/js/client.js"],
        dest: "client/js/main.min.js",
      },
    },
    concat_css: {
      all: {
        src: ["client/css/vendor/*.css", "client/css/client.css"],
         dest: "client/css/styles.min.css"
      }
    },
    jsdoc : {
      dist : {
        src: ["client/js/client.js"], 
        dest: "client/doc"
      }
    },
    uglify: {
      min: {
        files: [{
           expand: true,
           src: [
             "client/js/main.min.js"
           ]
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ["client/css/styles.min.css"]
        }]
      }
    },
    sass: {                              
      dist: {                            
        options: {                       
          style: "expanded"
        },
        files: {                         
          "client/css/client.css": "client/scss/client.scss",        
        }
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-concat-css");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Register tasks
  grunt.registerTask("build", [
    "sass",
    "concat",
    "concat_css:all",
    "uglify",
    "cssmin"
  ]);
};


  

