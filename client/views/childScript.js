App.ChildScriptView = Ember.CollectionView.extend({
    content: function() {
        if (this.get('parentView.content') != 'repeat' ||
            this.get('parentView.content') != 'forever')
            return this.get('parentView.content.children');
        else
            return [];
    }.property(),

    tagName: 'ul',
    classNames: ['ui-sortable', 'control-list', 'block-list', 'clearfix'],
    itemViewClass: App.BlockView
});