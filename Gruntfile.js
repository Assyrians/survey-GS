

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
        'client/app/auth/auth.js',
        'client/app/services/services.js',
        'client/app/reports/newReport.js',
        'client/app/reports/reportsView.js',
        'client/app/reports/singleReportView.js',
        'client/app/reports/generalReportView.js',
        'client/app/home/home.js',
        'client/app/app.js'
        ],
        dest: 'client/dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
                mangle: false
            },
      target: {
        files: {
          'client/dist/<%= pkg.name %>.min.js': ['client/dist/survey-gs.js']
        }
      }
    },


    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      dist: {
        files: {
          'client/dist/style.min.css': 'client/styles/style.css'
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'client/**/*.js'
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'client/**/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push heroku master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');


  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////


  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('heroku:production', ['build']);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      grunt.task.run([ 'shell:prodServer' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'build',
    'upload'
  ]);


};