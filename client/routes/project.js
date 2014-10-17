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
        }
        return project;
    }
});