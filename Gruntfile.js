var fs = require('fs');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify_newer: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '*.js'
                }]
            }
        },

        uglify: {
            options: {
                banner: (
                    '<% var widget = widgets[grunt.task.current.target]; %>' +
                    '/*\n' +
                    'Widget:   q4.<%= widget.name %>\n' +
                    'Version:  <%= widget.version %>\n' +
                    'Compiled: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '*/\n'
                )
            }
        },

        clean: {
            examples: ['docs/examples/latestSrc/q4.*.min.js']
        },

        copy: {
            examples: {
                expand: true,
                cwd: 'dist/latest/',
                src: 'q4.*.min.js',
                dest: 'docs/examples/latestSrc/'
            }
        },

        less: {
            default: {
                src: 'jsdoc_template/style.less',
                dest: 'docs/style.css'
            }
        },

        jsdoc: {
            default: {
                src: 'src/*.js',
                dest: 'docs',
                options: {
                    configure: 'jsdoc.conf.json'
                }
            }
        },

        watch: {
            min: {
                files: ['src/*.js'],
                tasks: ['min']
            },
            less: {
                files: ['jsdoc_template/style.less'],
                tasks: ['less']
            },
            jsdoc: {
                files: ['jsdoc_template/publish.js', 'jsdoc_template/*.mustache', 'src/*.js'],
                tasks: ['jsdoc']
            }
        },
        browserSync: {
            serveSticky: {
                bsFiles: {
                    src: [
                        'src/*.js',
                        'docs/examples/css/*.css',
                        'docs/examples/js/*.js'
                    ]
                },
                options: {
                    // watchTask: true,
                    port: 9000,
                    //open: 'external',
                    host: 'stickyWidget',
                    server: './',
                    startPath: "docs/examples/index.html"
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerMultiTask('uglify_newer', function() {
        // generate target filenames based on version numbers
        grunt.config('clean_and_uglify.default.files', this.files.map(function(file) {
            var path = file.src[0],
                data = fs.readFileSync(path, 'utf8'),
                name = path.match(/q4\.(.*)\.js/)[1],
                version = data.match(/@version (.*)/)[1],
                file = {
                    src: [path],
                    dest: 'dist/q4.' + name + '.' + version + '.min.js'
                };

            // create clean and uglify targets for this file
            grunt.config('clean.' + name, ['dist/**/q4.' + name + '*.min.js']);
            grunt.config('uglify.' + name + '.files', [file]);
            grunt.config('copy.' + name, {
                src: [file.dest],
                dest: 'dist/latest/q4.' + name + '.min.js'
            });

            // while we're at it, add info to config for use in the uglify banner
            grunt.config('widgets.' + name, {
                name: name,
                version: version
            });

            // add this file to the clean/uglify task
            return file;
        }));

        // run clean/uglify only for changed files
        grunt.task.run('newer:clean_and_uglify');
    });

    grunt.registerMultiTask('clean_and_uglify', function() {
        this.files.forEach(function(file) {
            // run the clean and uglify targets for this file
            var name = file.src[0].match(/q4\.(.*)\.js/)[1];
            grunt.task.run('clean:' + name);
            grunt.task.run('uglify:' + name);
            grunt.task.run('copy:' + name);
        });
    });
    grunt.registerTask('updateExamples', ['newer:clean:examples', 'newer:copy:examples']);

    grunt.registerTask('min', ['uglify_newer', 'updateExamples']);
    grunt.registerTask('doc', ['newer:less', 'newer:jsdoc']);

    grunt.registerTask('serveSticky', ['browserSync:serveSticky']);

    grunt.registerTask('default', ['min', 'doc']);
};

