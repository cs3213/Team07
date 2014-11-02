App.ScriptView = Ember.View.extend({
    templateName: 'script',
    tagName: 'section',

    blockPlayed: function() {
        // Add CSS class to played block
        var id = this.get('controller.playingBlock');
        this.$('.script-area li').removeClass('is-playing');

        if (id) this.$('.' + id).addClass('is-playing');
    }.observes('controller.playingBlock'),

    /**
     * Called when the element of the view has been inserted into the DOM.
     */
    didInsertElement: function() {
        var controller = this.get('controller');
        var view = this;
        this.$('.ui-sortable').sortable({
            sortableIn: 0,
            placeholder: 'ui-state-highlight',

            receive: function(event, ui) {
                this.sortableIn = 1;
            },
            over: function(event, ui) {
                this.sortableIn = 1;
            },
            out: function(event, ui) {
                this.sortableIn = 0;
            },
            beforeStop: function(event, ui) {
                if (this.sortableIn === 0) {
                    ui.item.remove();
                }
            }
        }).on('sortupdate', function(event, ui) {
            var computeScriptModel = function(list, level) {
                console.log(list);
                var scripts = [];
                $(list).find('> li').each(function(index) {
                    var block = {
                        'idx': index,
                        'type': $(this).data('type'),
                        'setting': $(this).data('setting'),
                        'level': level
                    };
                    if ($(this).find('div').hasClass('control-block')) {
                        var controlList = $(this).children('div').children('.control-list');
                        block.children = computeScriptModel(controlList[0], level + 1);
                    }
                    if ($(this).find('div').hasClass('if-block')) {
                        var conditionList = $(this).find('div').children('.condition-list');
                        block.condition = computeConditionModel(conditionList[0]);
                    }
                    scripts[index] = block;
                    $(this).attr('id', 'block-' + level + '-' + index);
                });
                return scripts;
            };

            var computeConditionModel = function(list) {
                console.log($(list)[0]);

                var condition = $(list).find('> li:first-child');
                if (condition.length === 0 || condition.hasClass('ui-state-highlight'))
                    return [];

                var model = {
                    'idx': 0,
                    'type': condition.data('type').toString()
                };

                if (condition.find('div').hasClass('left-variable-block')) {
                    var leftVarList = condition.find('div').children('.left-variable-list');
                    model.left = computeVariableModel(leftVarList[0]);
                }

                if (condition.find('div').hasClass('right-variable-block')) {
                    var rightVarList = condition.find('div').children('.right-variable-list');
                    model.right = computeVariableModel(rightVarList[0]);
                }

                return [model];
            };

            var computeVariableModel = function(list, level) {
                console.log($(list)[0]);

                var variable = $(list).find('> li:first-child');
                if (variable.length === 0 || variable.hasClass('ui-state-highlight'))
                    return [];

                var model = {
                    'idx': 0,
                    'type': variable.data('type').toString(),
                    'setting': variable.data('setting')
                };

                if (variable.find('div').hasClass('left-variable-block')) {
                    var leftVarList = variable.find('div').children('.left-variable-list');
                    model.left = computeVariableModel(leftVarList[0]);
                }

                if (variable.find('div').hasClass('right-variable-block')) {
                    var rightVarList = variable.find('div').children('.right-variable-list');
                    model.right = computeVariableModel(rightVarList[0]);
                }

                return [model];
            };

            var scripts = computeScriptModel(this, 0);

            // Update model of script changes
            Ember.Logger.log(scripts);
            $('.script-area input, .script-area select').removeAttr('disabled');
            controller.set('model.script', scripts);
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
        contentBinding: 'controller.model.script',

        tagName: 'ul',
        classNames: ['ui-sortable', 'script-area', 'block-list', 'clearfix'],
        itemViewClass: App.BlockView
    })
});