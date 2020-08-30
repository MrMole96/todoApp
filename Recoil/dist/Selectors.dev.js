"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doneNotDoneCounter = exports.getAllTodoItems = void 0;

var _require = require("recoil"),
    selector = _require.selector;

var _require2 = require("./Atoms"),
    todoListItems = _require2.todoListItems,
    searchTerm = _require2.searchTerm,
    hideCompleted = _require2.hideCompleted;

var getAllTodoItems = selector({
  key: 'getAllTodoItems',
  get: function get(_ref) {
    var _get = _ref.get;

    var term = _get(searchTerm);

    var isVisibleCompleted = _get(hideCompleted);

    var items = _get(todoListItems);

    if (term != '') {
      items = items.filter(function (x) {
        return x.title.toUpperCase().includes(term.toUpperCase());
      });
    }

    if (isVisibleCompleted) {
      return items;
    } else {
      return items.filter(function (x) {
        return x.completed === false;
      });
    }
  },
  set: function set(_ref2, newValue) {
    var _set = _ref2.set;

    _set(todoListItems, newValue);
  }
});
exports.getAllTodoItems = getAllTodoItems;
var doneNotDoneCounter = selector({
  key: 'doneNotDoneCounter',
  get: function get(_ref3) {
    var _get2 = _ref3.get;

    var items = _get2(getAllTodoItems);

    var completed = items.filter(function (x) {
      return x.completed === true;
    }).length;
    var notCompleted = items.filter(function (x) {
      return x.completed === false;
    }).length;
    return {
      completed: completed,
      notCompleted: notCompleted
    };
  }
});
exports.doneNotDoneCounter = doneNotDoneCounter;