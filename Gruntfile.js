module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('component.json'),
    qunit: {
      all: ['spec/backbone-qunit.html']
    },
    karma: {
      options: {
        configFile: 'spec/karma.conf.js',
        browsers: ['PhantomJS'],
        autoWatch: true
      },
      ci: {
        options: {
          browsers: ['PhantomJS'],
          reporters: ['dots'],
          autoWatch: false,
          singleRun: true
        }
      },
      watch: {
        options: {
          browsers: ['PhantomJS'],
          reporters: ['dots', 'growl'],
          autoWatch: true
        }
      }
    },
    uglify: {
      'backbone-validator-min.js': ['backbone-validator.js']
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'spec/**/*spec.js',
        'backbone-validator.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    version: {
      update: {
        src: ['component.json', 'package.json', 'backbone-validator.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-version');

  grunt.registerTask('test', ['jshint', 'karma:ci', 'qunit']);
  grunt.registerTask('default', ['test']);

  grunt.registerTask('release', 'Releasing new version with update version', function() {
    var type = this.args[0] || 'patch';
    grunt.task.run(['test', 'version:update:' + type, 'uglify']);
  });
};
