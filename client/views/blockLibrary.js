App.BlockLibraryView = Ember.View.extend({
    defaultBlocks: ['setX', 'setY', 'move', 'showCharacter', 'hideCharacter', 'changeBackground', 'changeCostume', 'repeat'],

    templateName: 'blockLibrary',
    tagName: 'section',
    
    /**
     * Called when the element of the view has been inserted into the DOM.
     */
    didInsertElement: function() {
        this.$().find('li').draggable({
            helper: 'clone',
            revert: 'invalid',
            connectToSortable: '.ui-sortable'
        });
        this.$().find('input, select').attr('disabled', 'disabled');
    },

    willDestroyElement: function() {
        this.$().find('li').draggable('destroy');
    },

    libraryView: Ember.CollectionView.extend({
        defaultValues: {
            'setX': 0,
            'setY': 0,
            'move': 10,
            'showCharacter': 0,
            'hideCharacter': 0,
            'changeBackground': 'geometry2.png',
            'changeCostume': 'Bard.gif',
            'repeat': 10
        },

        content: function() {
            return this.get('parentView.defaultBlocks');
        }.property(),

        tagName: 'ul',
        classNames: ['block-library', 'block-list', 'clearfix'],
        itemViewClass: Ember.View.extend({
            attributeBindings: ['content:data-type', 'setting:data-setting'],

            // @TODO: Move this to server call
            backgrounds: [
                { name: 'geometry', value: 'geometry2.png' },
                { name: 'restaurant', value: 'restaurant_icons.png' },
                { name: 'school', value: 'school.png' },
                { name: 'skulls', value: 'skulls.png' },
                { name: 'small steps', value: 'small_steps.png' },
            ],

            costumes: [
                { name: 'Bard', value: 'Bard.gif' },
                { name: 'Black Mage', value: 'BlackMage.gif' },
                { name: 'Dragoon', value: 'Dragoon.gif' },
                { name: 'Monk', value: 'Monk.gif' },
                { name: 'Ninja', value: 'Ninja.gif' },
                { name: 'Red Mage', value: 'RedMage.gif' },
                { name: 'Summoner', value: 'Summoner.gif' },
                { name: 'Warrior', value: 'Warrior.gif' },
                { name: 'WhiteMage', value: 'White Mage.gif' },
            ],

            templateName: function() {
                return 'blocks/' + this.get('content');
            }.property(),

            // Create default settings for specific blocks
            setting: function() {
                return this.get('parentView.defaultValues.' + this.get('content'));
            }.property()
        })
    })
});