App.LeftVariableView = Ember.CollectionView.extend({
    content: function() {
        if (typeof this.get('parentView.content.left') !== 'undefined')
            return this.get('parentView.content.left');
        else
            return [];
    }.property(),

    tagName: 'ul',
    classNames: ['variable-list', 'left-variable-list', 'clearfix'],
    itemViewClass: Ember.View.extend({
        setting: Ember.computed.alias('content.setting'),

        didInsertElement: function() {
            this.$().data('type', this.get('content.type'));
            this.$().data('setting', this.get('content.setting'));

            this.$().attr('data-type', this.get('content.type'));

            this.$().find('input').val(this.get('content.setting'));
            this.$().find('select').val(this.get('content.setting'));
        },

        templateName: function() {
            return 'variables/' + this.get('content.type');
        }.property()
    })
});