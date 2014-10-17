App.ProjectRoute = Ember.Route.extend({
    model: function(params) {
        var store = this.store;
        var project = store.find('project', params)[0];
        if (typeof project == 'undefined') {
            project = store.createRecord(App.Project, {
                script: store.createRecord(App.Script),
                stage: store.createRecord(App.Stage, {
                    character: store.createRecord(App.Character)
                })
            });
            //store.createRecord('project', {});
            // if no project is found we create an empty one!
            /*project = this.store.createRecord('project', {
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
            });*/
        }
        return project;
    }
});