Astronomy.Behavior({
  name: 'sort',
  aliases: ['Sort', 'sortable'],
  options: {
    orderFieldName: 'order',
    rootFieldName: 'root'
  },
  init: function(behaviorData) {
    // Update behavior options with options defined by user in the class schema.
    if (_.has(behaviorData, 'orderFieldName')) {
      if (!_.isString(behaviorData.orderFieldName)) {
        throw new Error(
          'The "orderFieldName" option in the "sort" behavior has to ' +
          'be a string'
        );
      }

      this.options.orderFieldName = behaviorData.orderFieldName;
    }

    if (_.has(behaviorData, 'rootFieldName')) {
      if (!_.isString(behaviorData.rootFieldName)) {
        throw new Error(
          'The "rootFieldName" option in the "sort" behavior has to ' +
          'be a string'
        );
      }

      this.options.rootFieldName = behaviorData.rootFieldName;
    }
  },
  initSchema: function(schema) {
    // Get order and root fields' names (can be overridden by user).
    var orderFieldName = this.options.orderFieldName;
    var rootFieldName = this.options.rootFieldName;

    // Add order field.
    schema.addField(orderFieldName, {
      type: 'number',
      default: 0
    });

    // Add root field.
    schema.addField(rootFieldName);

    // Add methods to schema.
    schema.addMethods(methods);
  }
});
