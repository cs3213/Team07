App.ProjectRoute = Ember.Route.extend({
    model: function() {
        return {
            title: 'Untitled Project',
            stage: {
                background: 'school.png',
                character: {
                    costume: 'Warrior.gif',
                    x: 240,
                    y: 150
                }
            },
            script: {
                blocks: []
            }
        };
    }
});