var ProjectSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecords.Mixin, {
    attrs: {
        blocks: { embedded: 'always' },
        stage: { embedded: 'always' }
    }
});