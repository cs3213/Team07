App.ProjectRoute = Ember.Route.extend({
    model: function() {
        return {
            title: 'Untitled Project',
            stage: {
                background: 'school.png',
                character: {
                    costume: 'Warrior.gif',
                    x: 220,
                    y: 130,
                    visible: true
                }
            },
            script: {
                blocks: []
            }
        };
    }
});