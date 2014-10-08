exports.config =
    # See http://brunch.io/#documentation for docs.
    files:
        javascripts:
            joinTo: 'app.js': /^(client|vendor|bower_components)/
            order:
                before: [
                    'bower_components/jquery/jquery.js'
                    'bower_components/boostrap/dist/js/bootstrap.js'
                ]
        stylesheets:
            joinTo: 'app.css': /^(client|vendor|bower_components)/
        templates:
            precompile: true
            root: 'templates'
            joinTo: 'app.js': /^client/