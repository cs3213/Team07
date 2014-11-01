/**
 * Class to handle condition logic.
 */
App.Condition = Ember.Object.extend({
    result: function(controller) {
        return true;
    }
});

App.TrueCondition = App.Condition.extend();

App.EqualCondition = App.Condition.extend({
    result: function(controller) {
        return true;
    }
});

App.GreaterThanCondition = App.Condition.extend({
    result: function(controller) {
        return true;
    }
});

App.LessThanCondition = App.Condition.extend({
    result: function(controller) {
        return true;
    }
});