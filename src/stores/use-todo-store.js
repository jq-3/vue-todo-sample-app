import { reactive } from '@vue/composition-api';

export const useTodoStore = (todos = []) => {
  const state = reactive({
    todos: todos,
  });

  const addTodoStore = todo => {
    state.todos.push(todo);
  };

  const removeTodoStore = todo => {
    const index = state.todos.findIndex(v => v.uid === todo.uid);
    state.todos.splice(index, 1);
  };

  return {
    get todos() {
      return state.todos;
    },
    addTodoStore,
    removeTodoStore,
  };
};
