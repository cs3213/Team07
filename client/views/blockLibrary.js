App.BlockLibraryView = Ember.View.extend({
    defaultBlocks: ['setX', 'setY', 'showCharacter', 'hideCharacter', 'changeCostume', 'changeBackground'],

    templateName: 'blockLibrary',
    tagName: 'section',

    libraryView: Ember.CollectionView.extend({
        content: function() {
            return this.get('parentView.defaultBlocks');
        }.property(),
        tagName: 'ul',
        classNames: ['block-library', 'clearfix'],
        itemViewClass: Ember.View.extend({
            templateName: function() {
                return 'blocks/' + this.get('content');
            }.property()
        })
    })
});