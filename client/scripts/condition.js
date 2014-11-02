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
        if (typeof this.left === 'undefined' || typeof this.right === 'undefined')
            return false;

        var leftData = this.left.get(0);
        var rightData = this.right.get(0);

        if (typeof leftData === 'undefined' || typeof rightData === 'undefined')
            return false;

        var leftClass = leftData.type.charAt(0).toUpperCase() + leftData.type.slice(1) + 'Variable',
            left = App[leftClass].create(leftData),
            rightClass = rightData.type.charAt(0).toUpperCase() + rightData.type.slice(1) + 'Variable',
            right = App[rightClass].create(rightData);

        return (left.value(controller) == right.value(controller));
    }
});

App.GreaterThanCondition = App.Condition.extend({
    result: function(controller) {
        if (typeof this.left === 'undefined' || typeof this.right === 'undefined')
            return false;

        var leftData = this.left.get(0);
        var rightData = this.right.get(0);

        if (typeof leftData === 'undefined' || typeof rightData === 'undefined')
            return false;

        var leftClass = leftData.type.charAt(0).toUpperCase() + leftData.type.slice(1) + 'Variable',
            left = App[leftClass].create(leftData),
            rightClass = rightData.type.charAt(0).toUpperCase() + rightData.type.slice(1) + 'Variable',
            right = App[rightClass].create(rightData);

        return (left.value(controller) > right.value(controller));
    }
});

App.LessThanCondition = App.Condition.extend({
    result: function(controller) {
        if (typeof this.left === 'undefined' || typeof this.right === 'undefined')
            return false;

        var leftData = this.left.get(0);
        var rightData = this.right.get(0);

        if (typeof leftData === 'undefined' || typeof rightData === 'undefined')
            return false;

        var leftClass = leftData.type.charAt(0).toUpperCase() + leftData.type.slice(1) + 'Variable',
            left = App[leftClass].create(leftData),
            rightClass = rightData.type.charAt(0).toUpperCase() + rightData.type.slice(1) + 'Variable',
            right = App[rightClass].create(rightData);

        return (left.value(controller) < right.value(controller));
    }
});