var getSelector = function() {
  var rootFieldName = getOption.call(this, 'rootFieldName');

  var selector = {};
  selector[rootFieldName] = this.get(rootFieldName);

  return selector;
};

var getOption = function(name) {
  // Find a class on which the behavior had been set.
  var behaviorData = Astro.utils.behaviors.findBehavior(this.constructor, 'sort');

  return behaviorData[name];
};

var getCollection = function() {
  return this.constructor.getCollection();
};

methods = {};

methods.getTop = function() {
  var orderFieldName = getOption.call(this, 'orderFieldName');
  var selector = getSelector.call(this);
  var options = {};

  options.sort = {};
  options.sort[orderFieldName] = -1;

  return getCollection.call(this).findOne(selector, options);
};

methods.takeOut = function() {
  // We can only take out documents that are already in the collection.
  if (!this._id) {
    return false;
  }

  var orderFieldName = getOption.call(this, 'orderFieldName');
  var selector = getSelector.call(this);

  selector[orderFieldName] = {
    $gt: this.get(orderFieldName)
  };

  // Move documents down.
  getCollection.call(this).find(selector).forEach(function(doc) {
    doc[orderFieldName]--;
    doc.save();
  });

  this.remove();

  return true;
};

methods.insertAt = function(position) {
  // We can only insert documents that are not already in the collection.
  // If you want to move document to another sorted queue you have to take
  // it out first using `takeOut` function.
  if (this._id) {
    return false;
  }

  // Get order field name.
  var orderFieldName = getOption.call(this, 'orderFieldName');

  // Get top layer in the given sorting queue.
  var top = this.getTop();
  if (top) {
    // Document can be inserted at position equal to position of the highest
    // document incremented by one.
    position = Math.min(top.get(orderFieldName) + 1, position);

    // Check whether we are insterting at the top of the stack or in the
    // middle of it.
    if (position <= top.get(orderFieldName)) {
      var selector = getSelector.call(this);

      selector[orderFieldName] = {
        $gte: position
      };

      // Move documents down.
      getCollection.call(this).find(selector).forEach(function(doc) {
        doc[orderFieldName]++;
        doc.save();
      });
    }
  } else {
    // If there are no documents, insert this one at 0 position.
    position = 0;
  }

  this.set(orderFieldName, position);
  this.save();

  return true;
};

methods.moveBy = function(shift) {
  // Get order field name.
  var orderFieldName = getOption.call(this, 'orderFieldName');

  return this.moveTo(this.get(orderFieldName) + shift);
};

methods.moveTo = function(position) {
  // We can only move documents that are already in the collection.
  if (!this._id) {
    return false;
  }

  // Get order field name.
  var orderFieldName = getOption.call(this, 'orderFieldName');
  // Get most top layer in the sorted queue.
  var top = this.getTop();
  // The document can be moved up to the position of the most top document and
  // not below the 0 position.
  position = Math.max(0, Math.min(top.get(orderFieldName), position));

  // If the document is at the position to which we are moving it, then we can
  // stop this function.
  if (this.get(orderFieldName) === position) {
    return false;
  }

  // Prepare selector and options object.
  var selector = getSelector.call(this);

  // If new position is higher than the old one.
  if (position > this.get(orderFieldName)) {

    // Modify selector to move only certain documents.
    selector[orderFieldName] = {
      // Documents with the position higher than the old one and...
      $gt: this.get(orderFieldName),
      // ... lower or equal to the new one.
      $lte: position
    };

    // Move documents down.
    getCollection.call(this).find(selector).forEach(function(doc) {
      doc[orderFieldName]--;
      doc.save();
    });

    // If new position is lower than the old one.
  } else if (position < this.get(orderFieldName)) {

    // Modify selector to move only certain documents.
    selector[orderFieldName] = {
      // Documents with the position higher or equal to the new one and...
      $gte: position,
      // ... lower than old one.
      $lt: this.get(orderFieldName)
    };

    // Move documents up.
    getCollection.call(this).find(selector).forEach(function(doc) {
      doc[orderFieldName]++;
      doc.save();
    });

    // If position have not changed, then stop execution.
  } else {
    return false;
  }

  this.set(orderFieldName, position);
  this.save();

  return true;
};

methods.moveUp = function() {
  return this.moveBy(+1);
};

methods.moveDown = function() {
  return this.moveBy(-1);
};

methods.moveToTop = function() {
  var top = this.getTop();

  // Get order field name.
  var orderFieldName = getOption.call(this, 'orderFieldName');

  return this.moveTo(top.get(orderFieldName));
};

methods.moveToBottom = function() {
  return this.moveTo(0);
};
