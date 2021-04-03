import { ADD_TODO, UPDATE_TODO_LIST, UPDATE_TODO, UPDATE_TODO_LIST_SORTING } from "../actions/todo";
import { sortTodoList } from "../utils";

const deafultState = {
    list: [
        {
            id: 1,
            title: 'Test',
            description: 'test',
            deadline: '2020-12-12',
            priority: 'LOW',
            status: 'TODO',
            startingDate: '2020-12-01',
            assignee: 'Mahabbat Huseynov'
        },
        {
            id: 2,
            title: 'Test',
            description: 'test',
            deadline: '2020-12-13',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            startingDate: '2020-10-10',
            assignee: 'Mahabbat Huseynov'
        },
        {
            id: 3,
            title: 'Test',
            description: 'test',
            deadline: '2020-11-12',
            priority: 'MEDIUM',
            status: 'DONE',
            startingDate: '2020-08-11',
            assignee: 'Mahabbat Huseynov'
        }
    ],
    sorting: {
        sortBy: 'status',
        direction: 'asc',
    }
}

export default function reducer(state=deafultState, { type, payload }) {
    switch(type) {
        case ADD_TODO:
            return {
                ...state,
                list: sortTodoList([
                    ...state.list,
                    payload
                ], state.sorting.sortBy, state.sorting.direction),
            }
        case UPDATE_TODO_LIST: 
            return {
                ...state,
                list: payload
            }
        case UPDATE_TODO_LIST_SORTING:
            return {
                ...state,
                sorting: payload,
            }
        case UPDATE_TODO:
            return {
                ...state,
                list: state.list.map((todo) => todo.id === payload.id ? payload : todo)
            }
        default:
            return state;
    }
}