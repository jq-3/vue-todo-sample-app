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
import AddTodo from './AddTodo';
import TodoFilters from './TodoFilters';
import TodoTable from './TodoTable';
import statusKey from '../stores/use-status-key';
import todoKey from '../stores/use-todo-key';
import { provide } from '@vue/composition-api';
import { useGetStatuses } from '../composables/use-get-statuses';
import { useGetTodos } from '../composables/use-get-todos';
import { useTodoFilter } from '../composables/use-todo-filter';
import { useStatusStore } from '../stores/use-status-store';
import { useTodoStore } from '../stores/use-todo-store';

export default {
  components: { AddTodo, TodoFilters, TodoTable },
  setup() {
    // ステータス一覧を取得してストアに格納
    const { getStatuses } = useGetStatuses();
    const statusStore = useStatusStore(getStatuses());
    const { statuses, statusesWithAll } = statusStore;
    provide(statusKey, statusStore);

    // TODO一覧を取得してストアに格納
    const { getTodos } = useGetTodos();
    const todoStore = useTodoStore(getTodos());
    provide(todoKey, todoStore);

    const { filteredTodos, updateFilter } = useTodoFilter();

    return {
      // Mutable state (store)
      statuses,
      statusesWithAll,
      // computed
      filteredTodos,
      // Function
      updateFilter,
    };
  },
};
</script>
