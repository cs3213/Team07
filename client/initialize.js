window.App = Ember.Application.create({
    LOG_TRANSITIONS: true, // basic logging of successful transitions
    LOG_TRANSITIONS_INTERNAL: true,
    LOG_ACTIVE_GENERATION: true,
    LOG_BINDINGS: true,
    LOG_VIEW_LOOKUPS: true
});
 
require('store');
require('router');
 
var folderOrder = [ 'routes', 'models', 'views', 'controllers', 'helpers',
                    'templates', 'components', 'scripts' ];

folderOrder.forEach(function(folder) {
    window.require.list().filter(function(module) {
        return new RegExp("^" + folder + "/.").test(module);
    }).forEach(function(module) {
        require(module);
    });
});

folderOrder = [ 'transforms', 'serializers' ];

require('transforms/array');
require('serializers/project');
require('serializers/stage');

console.log(Ember.TEMPLATES);