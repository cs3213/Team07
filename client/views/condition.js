App.ConditionView = Ember.CollectionView.extend({
    content: function() {
        if (this.get('parentView.content') != 'if')
            return this.get('parentView.content.condition');
        else
            return [];
    }.property(),

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