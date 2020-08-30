const { atom } = require("recoil");

export const todoListItems = atom({
    key: 'todoListItems',
    default: []
});

export const todoNewItem = atom({
    key: 'todoNewItem',
    default: ""
})

export const searchTerm = atom({
    key: 'searchTerm',
    default: ''
})

export const hideCompleted = atom({
    key: 'hideCompleted',
    default: true
})

export const deletedTask = atom({
    key: 'deletedTask',
    default: {}
})

