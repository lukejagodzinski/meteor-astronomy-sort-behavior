The Sort behavior helps with the process of sorting documents. It delivers several useful methods to manage sorting.

The `takeOut` method takes document out of the sorted list.

```js
var post = Posts.findOne();
post.takeOut();
```

The `insertAt` method inserts document on the given position in the list.

```js
var post = Posts.findOne();
post.insert(0); // Insert at the beginning of the list
```

The `moveBy` method moves document up or down by given distance.

```js
var post = Posts.findOne();
post.moveBy(2); // Move up by 2
post.moveBy(-2); // Move down by 2
```

The `moveTo` method moves document to given position.

```js
var post = Posts.findOne();
post.moveTo(10); // Moves document to position 10
```

The `moveUp` and `moveDown` methods move document up or down by given distance.

```js
var post = Posts.findOne();
post.moveUp(2); // Move up by 2
post.moveDown(2); // Move down by 2
```

The `moveToTop` and `moveToBottom` methods move document to the top or bottom of the list.

```js
var post = Posts.findOne();
post.moveTop(); // Move to up
post.moveBottom(); // Move to bottom
```
