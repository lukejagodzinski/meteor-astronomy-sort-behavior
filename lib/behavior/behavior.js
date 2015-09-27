Astro.createBehavior({
  name: 'sort',
  options: {
    orderFieldName: 'order',
    hasRootField: false,
    rootFieldName: 'root'
  },
  createSchemaDefinition: function(options) {
    var schemaDefinition = {
      fields: {},
      methods: methods
    };

    // Add a field storing a removal flag.
    schemaDefinition.fields[options.orderFieldName] = {
      type: 'number',
      default: 0
    };

    if (options.hasRootField) {
      schemaDefinition.fields[options.rootFieldName] = {
        type: 'null',
        default: null
      };
    }

    return schemaDefinition;
  }
});
