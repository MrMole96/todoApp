const { selector } = require("recoil");
const { todoListItems, searchTerm, hideCompleted } = require("./Atoms");

export const getAllTodoItems = selector({
    key: 'getAllTodoItems',
    get:  ({ get }) => {
        const term = get(searchTerm)
        const isVisibleCompleted = get(hideCompleted)
        var items = get(todoListItems);

        if (term != '') {
            items = items.filter(x => x.title.toUpperCase().includes(term.toUpperCase()))
        }
        if (isVisibleCompleted) {
            return items;
        } else {
            return items.filter(x => x.completed === false)
        }
    },
    set: ({ set }, newValue) => {      
        set(todoListItems, newValue)
    }
})

export const doneNotDoneCounter = selector({
    key: 'doneNotDoneCounter',
    get: ({ get }) => {
        var items = get(getAllTodoItems);
        var completed = items.filter(x => x.completed === true).length
        var notCompleted = items.filter(x => x.completed === false).length
        return { completed, notCompleted }
    }
})