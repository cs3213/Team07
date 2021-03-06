/**
 * Class to handle variable logic.
 */
App.Variable = Ember.Object.extend({
    value: function(controller) {
        return true;
    }
});

App.MouseXVariable = App.Variable.extend({
    value: function(controller) {
        return controller.get('mouseX');
    }
});

App.MouseYVariable = App.Variable.extend({
    value: function(controller) {
        return controller.get('mouseY');
    }
});

App.SpriteXVariable = App.Variable.extend({
    value: function(controller) {
        return controller.get('stage.character.x');
    }
});

App.SpriteYVariable = App.Variable.extend({
    value: function(controller) {
        return controller.get('stage.character.y');
    }
});

App.StageWidthVariable = App.Variable.extend({
    value: function(controller) {
        return $('#stage-canvas').width();
    }
});

App.StageHeightVariable = App.Variable.extend({
    value: function(controller) {
        return $('#stage-canvas').height();
    }
});

App.NumberInputVariable = App.Variable.extend({
    value: function(controller) {
        if (typeof this.setting === 'undefined')
            return 0;
        else
            return parseInt(this.setting, 10);
    }
});

App.RandomVariable = App.Variable.extend({
    value: function(controller) {
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

        var lower = left.value(controller),
            upper = right.value(controller);

        randomNumber = parseInt((Math.random() * (upper - lower)) + lower, 10);
        console.log(randomNumber);
        return randomNumber;
    }
});

App.DivideVariable = App.Variable.extend({
    value: function(controller) {
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

        return (left.value(controller) / right.value(controller));
    }
});

App.ModVariable = App.Variable.extend({
    value: function(controller) {
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

        return (left.value(controller) % right.value(controller));
    }
});

App.MultiplyVariable = App.Variable.extend({
    value: function(controller) {
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

        return (left.value(controller) * right.value(controller));
    }
});

App.PlusVariable = App.Variable.extend({
    value: function(controller) {
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

        return (left.value(controller) + right.value(controller));
    }
});

App.SubstractVariable = App.Variable.extend({
    value: function(controller) {
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

        return (left.value(controller) - right.value(controller));
    }
});