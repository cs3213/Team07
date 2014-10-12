App.BlockLibraryView = Ember.View.extend({
    defaultBlocks: ['setX', 'setY', 'move', 'showCharacter', 'hideCharacter'],

    templateName: 'blockLibrary',
    tagName: 'section',
    
    /**
     * Called when the element of the view has been inserted into the DOM.
     */
    didInsertElement: function() {
        this.$().find('li').draggable({
            helper: 'clone',
            revert: 'invalid',
            connectToSortable: '.script-area'
        });
    },

    libraryView: Ember.CollectionView.extend({
        content: function() {
            return this.get('parentView.defaultBlocks');
        }.property(),

        tagName: 'ul',
        classNames: ['block-library', 'block-list', 'clearfix'],
        itemViewClass: Ember.View.extend({
            attributeBindings: ['content:data-type', 'setting:data-setting'],
            templateName: function() {
                return 'blocks/' + this.get('content');
            }.property()
        })
    })
});