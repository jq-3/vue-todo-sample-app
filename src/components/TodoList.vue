<template>
  <section class="section">
    <TodoFilters
      :filteredTodos="filteredTodos"
      :statusesWithAll="statusesWithAll"
      @update-filter="updateFilter"
    />
    <div class="container">
      <AddTodo />
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
import AddTodo from './AddTodo';
import { useGetStatuses } from '../composables/use-get-statuses';
import { useStatusStore } from '../stores/use-status-store';
import statusKey from '../stores/use-status-key';
import { useGetTodos } from '../composables/use-get-todos';
import { useTodoStore } from '../stores/use-todo-store';
import todoKey from '../stores/use-todo-key';
import { useTodoFilter } from '../composables/use-todo-filter';

export default {
  components: { TodoFilters, TodoTable, AddTodo },
  setup() {
    const { getStatuses } = useGetStatuses();
    const statusStore = useStatusStore(getStatuses());
    const { statuses, statusesWithAll } = statusStore;
    provide(statusKey, statusStore);

    const { getTodos } = useGetTodos();
    const todoStore = useTodoStore(getTodos());
    provide(todoKey, todoStore);

    const { filteredTodos, updateFilter } = useTodoFilter();

    return {
      statuses,
      statusesWithAll,
      filteredTodos,
      updateFilter,
    };
  },
};
</script>
