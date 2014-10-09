var Character = DS.Model.extend({
    uuid: DS.attr('string'),
    costume: DS.attr('string'),
    visible: DS.attr('boolean', { defaultValue: true }),
    // TODO: change this to center of stage size
    x: DS.attr('number', { defaultValue: 0 }),
    y: DS.attr('number', { defaultValue: 0 })
});