App.Stage = DS.Model.extend({
    background: DS.attr('string', { defaultValue: 'school.png' }),
    character: DS.belongsTo('character', { embedded: true })
});