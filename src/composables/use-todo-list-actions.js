import { inject, reactive, toRefs } from '@vue/composition-api';
import todoKey from '../stores/use-todo-key';

export const useTodoListActions = () => {
  const todoStore = inject(todoKey);

  const state = reactive({
    newTodo: '',
    editedTodo: null,
    beforeEditCache: '',
  });

  const addTodo = () => {
    if (state.newTodo.trim() === '') {
      return;
    }

    const newTodo = {
      uid: todoStore.todos.length + 1,
      title: state.newTodo.trim(),
      status: 'todo',
    };
    todoStore.addTodoStore(newTodo);
    state.newTodo = '';
  };

  const removeTodo = todo => todoStore.removeTodoStore(todo);

  const editTodo = todo => {
    state.beforeEditCache = todo.title;
    state.editedTodo = todo;
  };

  const doneEdit = todo => {
    if (!state.editedTodo) {
      return;
    }
    state.editedTodo = null;
    todo.title = todo.title.trim();
    if (!todo.title) {
      todoStore.removeTodoStore(todo);
    }
  };

  const cancelEdit = todo => {
    state.editedTodo = null;
    todo.title = state.beforeEditCache;
  };

  return {
    ...toRefs(state),
    addTodo,
    removeTodo,
    editTodo,
    doneEdit,
    cancelEdit,
  };
};
