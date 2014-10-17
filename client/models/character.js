App.Character = DS.Model.extend({
    costume: DS.attr('string', { defaultValue: 'Warrior.gif' }),
    visible: DS.attr('boolean', { defaultValue: true }),
    x: DS.attr('number', { defaultValue: 220 }),
    y: DS.attr('number', { defaultValue: 130 })
});