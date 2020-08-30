"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletedTask = exports.hideCompleted = exports.searchTerm = exports.todoNewItem = exports.todoListItems = void 0;

var _require = require("recoil"),
    atom = _require.atom;

var todoListItems = atom({
  key: 'todoListItems',
  "default": []
});
exports.todoListItems = todoListItems;
var todoNewItem = atom({
  key: 'todoNewItem',
  "default": ""
});
exports.todoNewItem = todoNewItem;
var searchTerm = atom({
  key: 'searchTerm',
  "default": ''
});
exports.searchTerm = searchTerm;
var hideCompleted = atom({
  key: 'hideCompleted',
  "default": true
});
exports.hideCompleted = hideCompleted;
var deletedTask = atom({
  key: 'deletedTask',
  "default": {}
});
exports.deletedTask = deletedTask;