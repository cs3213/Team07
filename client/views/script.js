App.ScriptView = Ember.View.extend({
    templateName: 'script',
    tagName: 'section',

    /**
     * Called when the element of the view has been inserted into the DOM.
     */
    didInsertElement: function() {
        var controller = this.get('controller');
        this.$('.script-area').sortable({
            placeholder: 'ui-state-highlight',
            update: function(event, ui) {
                var scripts = {};

                $(this).find('li').each(function(index) {
                    scripts[index] = {
                        'idx': index,
                        'type': $(this).data('type'),
                        'setting': $(this).data('setting')
                    };
                });

                console.log(scripts);

                // @TODO: Update model of script changes
            },
            receive: function(event, ui) {
                sortableIn = 1;
            },
            over: function(event, ui) {
                sortableIn = 1;
            },
            out: function(event, ui) {
                sortableIn = 0;
            },
            beforeStop: function(event, ui) {
                if (sortableIn === 0)
                    ui.item.remove();
            }
        });
    },

    scriptListView: Ember.CollectionView.extend({
        content: function() {
        }.property(),

        tagName: 'ul',
        classNames: ['script-area', 'block-list', 'clearfix'],
        itemViewClass: Ember.View.extend({
            attributeBindings: ['content:data-type', 'setting:data-setting'],
            templateName: function() {
                return 'blocks/' + this.get('content.type');
            }
        })
    })
});