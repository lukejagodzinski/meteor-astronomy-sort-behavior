Astronomy.Behavior({
  name: 'sort',
  aliases: ['Sort', 'sortable'],
  options: {
    orderFieldName: 'order',
    rootFieldName: 'root'
  },
  oninitbehavior: function(behaviorData) {
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
  oninitclass: function(Class) {
    // Get order and root fields' names (can be overridden by user).
    var orderFieldName = this.options.orderFieldName;
    var rootFieldName = this.options.rootFieldName;

    // Add order field.
    Class.addField(orderFieldName, {
      type: 'number',
      default: 0
    });

    // Add root field.
    Class.addField(rootFieldName);

    // Add methods to the class.
    Class.addMethods(methods);
  }
});
