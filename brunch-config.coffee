exports.config =
    # See http://brunch.io/#documentation for docs.
    paths:
        watched: ['client', 'test']
        public: 'public'
    files:
        javascripts:
            defaultExtension: 'js'
            joinTo:
                'app.js': /^(client|vendor|bower_components)/
            order:
                before: [
                    'bower_components/jquery/dist/jquery.js'
                    'bower_components/handlebars/handlebars.js'
                    'bower_components/ember/ember.js'
                    'bower_components/ember-data-shim/ember-data.js'
                ]
                after: [
                    'bower_components/boostrap/dist/js/bootstrap.js'
                ]
        stylesheets:
            defaultExtension: 'css'
            joinTo: 'app.css': /^(client|vendor|bower_components)/
        templates:
            precompile: true
            root: '../client/templates'
            defaultExtension: 'hbs'
            joinTo: 'app.js': /^client/
    modules:
        nameCleaner: (path) ->
            path.replace /^client\//, ''