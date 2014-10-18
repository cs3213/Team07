App.ApplicationView = Ember.View.extend({
    didInsertElement: function() {
        var controller = this.get('controller');
        this.$().find('#new-project-btn').on('click', function() {
            if (confirm('Are you sure you want to create a new project? All changes made will be lost!')) {
                controller.send('newProject');
            }
        });
        this.$().find('#load-project-btn').on('click', function() {
            if (confirm('Are you sure you want to load your existing project? All changes made will be lost!')) {
                controller.send('loadProject');
            }
        });
    }
});