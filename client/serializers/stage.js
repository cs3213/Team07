App.StageSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        character: { embedded: 'always' }
    }
});