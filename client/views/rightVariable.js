App.RightVariableView = Ember.CollectionView.extend({
    content: function() {
        if (this.get('parentView.content') != 'equal')
            return this.get('parentView.content.right');
        else
            return [];
    }.property(),

    tagName: 'ul',
    classNames: ['variable-list', 'right-variable-list', 'clearfix'],
    itemViewClass: Ember.View.extend({
        didInsertElement: function() {
            this.$().data('type', this.get('content.type'));
            this.$().data('setting', this.get('content.setting'));
        },

        templateName: function() {
            return 'variables/' + this.get('content.type');
        }.property()
    })
});