<template>
  <section class="section">
    <div class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ filteredTodos.length }}</strong> Item(s)
          </p>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <b-input v-model="searchText" placeholder="Search..." type="search" icon="search" />
            </p>
          </div>
        </div>
      </div>
      <!-- Right side -->
      <div class="level-right">
        <b-field>
          <b-radio-button
            v-for="status in statusesWithAll"
            v-model="selectedStatus"
            :native-value="status.code"
            :key="status.code"
            name="status-filter"
          >
            {{ status.label }}
          </b-radio-button>
        </b-field>
      </div>
    </div>
    <div class="container">
      <form @submit.prevent="addTodo">
        <b-input v-model="newTodo" placeholder="Add Todo" />
      </form>
    </div>
    <div class="container">
      <TodoTable :filteredTodos="filteredTodos" />
    </div>
  </section>
</template>

<script>
import { provide } from '@vue/composition-api';
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
  components: { TodoTable },
  setup() {
    const { getStatuses } = useGetStatuses();
    const statusStore = useStatusStore(getStatuses());
    const { statuses, statusesWithAll } = statusStore;
    provide(statusKey, statusStore);

    const { getTodos } = useGetTodos();
    const todoStore = useTodoStore(getTodos());
    provide(todoKey, todoStore);

    const { selectedStatus, searchText, filteredTodos } = useTodoFilter();

    const { newTodo, addTodo } = useTodoListActions();

    return {
      statuses,
      statusesWithAll,
      selectedStatus,
      searchText,
      filteredTodos,
      newTodo,
      addTodo,
    };
  },
};
</script>
