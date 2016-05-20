module.exports = function(grunt) {
	
	
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'client/css/style.css' : 'client/sass/style.scss'
				}
			}
		},
		browserify: {
         dist: {
            options: {
                 transform: ["babelify"]
            },
            files: {
                "./client/dist/module.js": ["./client/modules/index.js"]
            }
         }
      },
      
        "babel": {
            "presets": ["react"]
        },
      
        
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
             scripts: {
            files: ["./client/modules/*.js"],
            tasks: ["browserify"]
         }

         
		}
        
 
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	    grunt.loadNpmTasks('grunt-browserify');
	grunt.registerTask('default',['watch']);
}