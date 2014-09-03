/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            static_mappings: {
                files: [{
                    src: ['dist/<%= pkg.name %>.js'],
                    dest: '../Chrome-Extension/<%= pkg.name %>.min.js'
                }, {
                    src: ['dist/<%= pkg.name %>.js'],
                    dest: 'dist/<%= pkg.name %>.min.js'
                },
                {
                    src: ['dist/<%= pkg.name %>.js'],
                    dest: '../Firefox-Extension/data/<%= pkg.name %>.min.js'
                },
                {
                    src: ['dist/<%= pkg.name %>.js'],
                    dest: '../Safari-Extension/Mirror.safariextension/<%= pkg.name %>.min.js'
                }],
            },
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },
        watch: {
            gruntfile: {
                files: ['<%= jshint.gruntfile.src %>', 'lib/*.js'],
                tasks: ['jshint:gruntfile', 'concat', 'uglify']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['jshint', 'watch', 'concat', 'uglify']);

};