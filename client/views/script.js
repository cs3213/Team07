App.ScriptView = Ember.View.extend({
    templateName: 'script',
    tagName: 'section',

    blockPlayed: function() {
        // Add CSS class to played block
        var idx = this.get('controller.playingBlock');
        this.$('.script-area li').removeClass('is-playing');

        if (idx >= 0) $(this.$('.script-area li').get(idx)).addClass('is-playing');
    }.observes('controller.playingBlock'),

    /**
     * Called when the element of the view has been inserted into the DOM.
     */
    didInsertElement: function() {
        var controller = this.get('controller');
        var view = this;
        this.$('.ui-sortable').sortable({
            placeholder: 'ui-state-highlight',

            receive: function(event, ui) {
                sortableIn = 1;

                if ($(this).find('div').hasClass('control-block')) {
                    $(this).find('.control-list').sortable({
                        placeholder: 'ui-state-highlight',
                        receive: function(event, ui) {
                            // Do not accept more loops!
                            sortableIn = 1;
                        },
                        over: function(event, ui) {
                            sortableIn = 1;
                        },
                        out: function(event, ui) {
                            sortableIn = 0;
                        },
                        beforeStop: function(event, ui) {
                            if (sortableIn === 0) {
                                ui.item.remove();
                            }
                        }
                    }).on('sortupdate', function(event, ui) {
                        view.$('ui-sortable').trigger('sortupdate');
                    });
                }
            },
            over: function(event, ui) {
                sortableIn = 1;
            },
            out: function(event, ui) {
                sortableIn = 0;
            },
            beforeStop: function(event, ui) {
                if (sortableIn === 0) {
                    ui.item.remove();
                }
            }
        }).on('sortupdate', function(event, ui) {
            var computeScriptModel = function(list) {
                var scripts = {};
                $(list).find('> li').each(function(index) {
                    var block = {
                        'idx': index,
                        'type': $(this).data('type'),
                        'setting': $(this).data('setting')
                    };
                    if ($(this).find('div').hasClass('control-block')) {
                        block.scripts = computeScriptModel($(this).find('.control-list'));
                    }
                    scripts[index] = block;
                    $(this).attr('data-idx', index);
                });
                return scripts;
            };

            var scripts = computeScriptModel(this);

            // Update model of script changes
            Ember.Logger.log(scripts);
            $('.script-area input, .script-area select').removeAttr('disabled');
            controller.set('model.script.blocks', scripts);
        });

        this.$('.script-area input, .script-area select').removeAttr('disabled');

        // Force change when setting changes
        this.$('.script-area').on('change', 'li input, li select', function(event) {
            $(this).closest('li').data('setting', $(this).val());
            // Trigger update from sortable
            $(this).closest('.script-area').trigger('sortupdate');
        });
    },

    willDestroyElement: function() {
        this.$('.ui-sortable').sortable('destroy');
    },

    scriptListView: Ember.CollectionView.extend({
        content: function() {

        }.property(),

        tagName: 'ul',
        classNames: ['ui-sortable', 'script-area', 'block-list', 'clearfix'],
        itemViewClass: Ember.View.extend({
            attributeBindings: ['content:data-type', 'setting:data-setting'],

            templateName: function() {
                return 'blocks/' + this.get('content.type');
            }
        })
    })
});