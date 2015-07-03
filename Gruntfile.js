module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
	    options: {
	      separator: ";",
	    },
	    dist: {
	      src: ["client/client.js","client/js/vendor/*.js"],
	      dest: "client/js/main.min.js",
	    },
	  },
	  concat_css: {
    	all: {
        src: ["client/css/*.css", "client/css/vendor/*.css"],
    	   dest: "client/css/styles.min.css"
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
    replace: {
      replaceCacheBustToken: {
        src: [
          "client.js"
        ],
        overwrite: true,
        replacements: [
          {
            from: /"\?bust=" \+ \(new Date\(\)\).getTime\(\)/g,
            to: "\"?bust=<%= grunt.file.readJSON(\"package.json\").version %>\""
          }
        ]
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-concat-css");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-scss");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-text-replace");

  // Register tasks
  grunt.registerTask("build", [
    "concat",
    "concat_css:all",
    "uglify",
    "cssmin"
  ]);
};

	