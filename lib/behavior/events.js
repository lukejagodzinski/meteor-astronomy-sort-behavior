events = {};

var checkBehaviorData = function(behaviorData) {
  if (!_.isString(behaviorData.orderFieldName)) {
    throw new Error(
      'The "orderFieldName" option in the "sort" behavior has to ' +
      'be a string'
    );
  }

  if (!_.isString(behaviorData.rootFieldName)) {
    throw new Error(
      'The "rootFieldName" option in the "sort" behavior has to ' +
      'be a string'
    );
  }
};

events.addBehavior = function(behaviorData) {
  var Class = this;
  var behavior = Astro.behaviors.sort;

  // Set default behavior's options if they were not provided in the schema.
  if (_.isUndefined(behaviorData.orderFieldName)) {
    behaviorData.orderFieldName = behavior.options.orderFieldName;
  }
  if (_.isUndefined(behaviorData.rootFieldName)) {
    behaviorData.rootFieldName = behavior.options.rootFieldName;
  }

  // Check validity of options.
  checkBehaviorData.call(Class, behaviorData);

  // Add order field.
  Class.addField(behaviorData.orderFieldName, {
    type: 'number',
    default: 0
  });

  // Add root field.
  Class.addField(behaviorData.rootFieldName);

  // Add methods to the class.
  Class.addMethods(methods);
};
