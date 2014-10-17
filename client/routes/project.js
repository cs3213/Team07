App.ProjectRoute = Ember.Route.extend({
    model: function() {
        //return this.store.find('project');
        var store = this.store;
        project = store.createRecord('project', {
            script: [],
            stage: store.createRecord('stage', {
                character: store.createRecord('character')
            })
        });
        return project;
    },

    /*afterModel: function(projects) {
        if (projects.length === 1) {
            this.set('model', projects.get('firstObject'));
        } else {
            var project = this.store.createRecord('project', {
                script: [],
                stage: this.store.createRecord('stage', {
                    character: this.store.createRecord('character')
                })
            });
            this.set('model', project);
        }
    }*/
});