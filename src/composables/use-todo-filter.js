import { inject, reactive, computed, toRefs } from '@vue/composition-api';
import todoKey from '../stores/use-todo-key';

export const useTodoFilter = () => {
  const todoStore = inject(todoKey);
  const state = reactive({
    selectedStatus: '',
    searchText: '',
  });

  const filteredTodos = computed(() => {
    if (state.selectedStatus === '' && state.searchText === '') {
      return todoStore.todos;
    }

    return todoStore.todos.filter(todo => {
      let display = true;
      if (state.searchText !== '') {
        display = todo.title.includes(state.searchText);
      }
      if (display && state.selectedStatus !== '') {
        display = todo.status === state.selectedStatus;
      }
      return display;
    });
  });

  return {
    ...toRefs(state),
    filteredTodos,
  };
};
