var StageSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecords.Mixin, {
    attrs: {
        character: { embedded: 'always' }
    }
});