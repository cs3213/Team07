App.BlockLibraryView = Ember.View.extend({
    defaultBlocks: ['setX', 'setY', 'move', 'showCharacter', 'hideCharacter'],

    templateName: 'blockLibrary',
    tagName: 'section',
    
    /**
     * Called when the element of the view has been inserted into the DOM or after the view was re-rendered.
     * Override this function to do any set up that requires an element in the document body.
     */
    didInsertElement: function() {
        this.$().find('li').draggable({
            helper: 'clone',
            revert: 'invalid'
        });
    },

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