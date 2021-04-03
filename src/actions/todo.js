export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO_LIST = "UPDATE_TODO_LIST";
export const UPDATE_TODO = "UPDATE_TODO";
export const UPDATE_TODO_LIST_SORTING = "UPDATE_TODO_LIST_SORTING";

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const updateTodoList = (todoList) => ({
  type: UPDATE_TODO_LIST,
  payload: todoList,
});

export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  payload: todo,
});

export const updateTodoListSorting = (sorting) => ({
  type: UPDATE_TODO_LIST_SORTING,
  payload: sorting,
});
