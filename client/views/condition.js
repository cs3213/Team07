App.ConditionView = Ember.CollectionView.extend({
    content: function() {
        if (this.get('parentView.content') != 'if')
            return this.get('parentView.content.condition');
        else
            return [];
    }.property(),

    didInsertElement: function() {
        var view = this;

        this.$().find('.variable-list').sortable({
            placeholder: 'ui-state-highlight',
            receive: function(event, ui) {
                sortableIn = 1;
            },
            over: function(event, ui) {
                sortableIn = 1;
            },
            out: function(event, ui) {
                sortableIn = 0;
            },
            beforeStop: function(event, ui) {
                if (sortableIn === 0) {
                    ui.item.remove();
                }
            }
        }).on('sortupdate', function(event, ui) {
            view.$('ui-sortable').trigger('sortupdate');
        });
    },

    tagName: 'ul',
    classNames: ['condition-list', 'clearfix'],
    itemViewClass: Ember.View.extend({
        didInsertElement: function() {
            this.$().data('type', this.get('content.type'));
        },

        templateName: function() {
            return 'conditions/' + this.get('content.type');
        }.property()
    })
});