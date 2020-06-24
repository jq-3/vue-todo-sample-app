<template>
  <section class="section">
    <TodoFilters
      :filteredTodos="filteredTodos"
      :statusesWithAll="statusesWithAll"
      @update-filter="updateFilter"
    />
    <div class="container">
      <form @submit.prevent="addTodo">
        <b-input v-model="newTodo" placeholder="Add Todo" />
      </form>
    </div>
    <div class="container">
      <TodoTable
        :filteredTodos="filteredTodos"
        :statuses="statuses"
        :statusesWithAll="statusesWithAll"
      />
    </div>
  </section>
</template>

<script>
import { provide } from '@vue/composition-api';
import TodoFilters from './TodoFilters';
import TodoTable from './TodoTable';
import { useGetStatuses } from '../composables/use-get-statuses';
import { useStatusStore } from '../stores/use-status-store';
import statusKey from '../stores/use-status-key';
import { useGetTodos } from '../composables/use-get-todos';
import { useTodoStore } from '../stores/use-todo-store';
import todoKey from '../stores/use-todo-key';
import { useTodoFilter } from '../composables/use-todo-filter';
import { useTodoListActions } from '../composables/use-todo-list-actions';

export default {
  components: { TodoFilters, TodoTable },
  setup() {
    const { getStatuses } = useGetStatuses();
    const statusStore = useStatusStore(getStatuses());
    const { statuses, statusesWithAll } = statusStore;
    provide(statusKey, statusStore);

    const { getTodos } = useGetTodos();
    const todoStore = useTodoStore(getTodos());
    provide(todoKey, todoStore);

    const { filteredTodos, updateFilter } = useTodoFilter();

    const { newTodo, addTodo } = useTodoListActions();

    return {
      statuses,
      statusesWithAll,
      filteredTodos,
      updateFilter,
      newTodo,
      addTodo,
    };
  },
};
</script>
