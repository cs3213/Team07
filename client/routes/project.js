App.ProjectRoute = Ember.Route.extend({
    model: function() {
        return {
            title: 'Untitled Project',
            stage: {
                background: 'school.png',
                character: {
                    costume: 'cat1-sprite@2x.png',
                    x: 240,
                    y: 150
                }
            }
        };
    }
});