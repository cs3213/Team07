App.NumberVariableView = Ember.CollectionView.extend({
    content: function() {
        if (typeof this.get('parentView.content.numVariable') !== 'undefined')
            return this.get('parentView.content.numVariable');
        else
            return [];
    }.property(),

    tagName: 'ul',
    classNames: ['variable-list', 'num-variable-list', 'clearfix'],
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