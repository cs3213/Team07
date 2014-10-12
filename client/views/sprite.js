App.SpriteView = Ember.CollectionView.extend({
    content: ['Warrior.gif', 'BlackMage.gif', 'WhiteMage.gif', 'RedMage.gif', 'Bard.gif', 'Dragoon.gif', 'Summoner.gif', 'Ninja.gif', 'Monk.gif'],
    tagName: 'ul',
    classNames: ['sprite-library', 'clearfix'],
    itemViewClass: Ember.View.extend({
        templateName: 'spriteItem',

        isSelected: function() {
            return this.get('content') == this.get('controller.selected');
        }.property(),

        spritePath: function() {
            return '/sprites/' + this.get('content');
        }.property(),


        // Find a better way to the CSS class with selected property...
        click: function(evt) {
            $('.sprite-library li a').removeClass('is-selected');
            $(evt.target).closest('a').addClass('is-selected');

            this.get('controller').send('selectCostume', this.get('content'));
        }
    }),
});
