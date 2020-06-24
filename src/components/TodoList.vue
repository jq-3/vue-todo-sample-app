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
        <b-input v-model="state.newTodo" placeholder="Add Todo" />
      </form>
    </div>
    <div class="container">
      <b-table :data="filteredTodos" striped hoverable>
        <template v-slot="todo">
          <b-table-column field="title" label="Title">
            <div :class="['todo', { editing: todo.row == state.editedTodo }]">
              <p class="control view" @dblclick="editTodo(todo.row)">{{ todo.row.title }}</p>
              <input
                class="control input edit"
                type="text"
                v-model="todo.row.title"
                @blur="doneEdit(todo.row)"
                @keyup.enter="doneEdit(todo.row)"
                @keyup.esc="cancelEdit(todo.row)"
              />
            </div>
          </b-table-column>
          <b-table-column label="Status" centered width="120">
            <b-select v-model="todo.row.status" placeholder="Status">
              <option v-for="status in statuses" :value="status.code" :key="status.code">
                {{ status.label }}
              </option>
            </b-select>
          </b-table-column>
          <b-table-column label="Delete" centered width="80">
            <b-button @click="removeTodo(todo.row)">
              <b-icon icon="trash" size="is-small"></b-icon>
            </b-button>
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="sad-tear" size="is-large" />
              </p>
              <p>Nothing here.</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import { reactive, provide } from '@vue/composition-api';
import { useGetStatuses } from '../composables/use-get-statuses';
import { useStatusStore } from '../stores/use-status-store';
import statusKey from '../stores/use-status-key';
import { useGetTodos } from '../composables/use-get-todos';
import { useTodoStore } from '../stores/use-todo-store';
import todoKey from '../stores/use-todo-key';
import { useTodoFilter } from '../composables/use-todo-filter';

export default {
  setup() {
    const { getStatuses } = useGetStatuses();
    const statusStore = useStatusStore(getStatuses());
    const { statuses, statusesWithAll } = statusStore;
    provide(statusKey, statusStore);

    const { getTodos } = useGetTodos();
    const todoStore = useTodoStore(getTodos());
    const { todos, addTodoStore, removeTodoStore } = todoStore;
    provide(todoKey, todoStore);
    const { selectedStatus, searchText, filteredTodos } = useTodoFilter(todos);

    const state = reactive({
      newTodo: '',
      editedTodo: null,
      beforeEditCache: '',
    });

    const addTodo = () => {
      if (state.newTodo.trim() === '') {
        return;
      }

      const newTodo = { uid: todos.length + 1, title: state.newTodo.trim(), status: 'todo' };
      addTodoStore(newTodo);
      state.newTodo = '';
    };

    const removeTodo = todo => removeTodoStore(todo);

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
        removeTodoStore(todo);
      }
    };

    const cancelEdit = todo => {
      state.editedTodo = null;
      todo.title = state.beforeEditCache;
    };

    return {
      statuses,
      statusesWithAll,
      selectedStatus,
      searchText,
      filteredTodos,
      addTodo,
      removeTodo,
      editTodo,
      doneEdit,
      cancelEdit,
      state,
    };
  },
};
</script>

<style scoped lang="scss">
.todo {
  & > .view {
    display: initial;
  }

  &.editing > .view {
    display: none;
  }

  & > .edit {
    display: none;
  }

  &.editing > .edit {
    display: initial;
  }
}
</style>
