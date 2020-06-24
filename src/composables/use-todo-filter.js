import { reactive, computed, toRefs } from '@vue/composition-api';

export const useTodoFilter = todos => {
  const state = reactive({
    selectedStatus: '',
    searchText: '',
  });

  const filteredTodos = computed(() => {
    if (state.selectedStatus === '' && state.searchText === '') {
      return todos;
    }

    return todos.filter(todo => {
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
