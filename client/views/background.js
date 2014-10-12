App.BackgroundView = Ember.CollectionView.extend({
    content: ['geometry2.png', 'school.png', 'restaurant_icons.png', 'skulls.png', 'small_steps.png'],
    tagName: 'ul',
    classNames: ['background-library', 'clearfix'],
    itemViewClass: Ember.View.extend({
        templateName: 'backgroundItem',

        isSelected: function() {
            return this.get('content') == this.get('controller.selected');
        }.property(),

        backgroundStyle: function() {
            return 'background: url(/background/' + this.get('content') + ') repeat center center';
        }.property(),

        // Find a better way to the CSS class with selected property...
        click: function(evt) {
            $('.background-library li a').removeClass('is-selected');
            $(evt.target).addClass('is-selected');

            this.get('controller').send('selectBackground', this.get('content'));
        }
    }),
});
