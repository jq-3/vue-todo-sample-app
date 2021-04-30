<template>
  <b-table :data="filteredTodos" striped hoverable>
    <template v-slot="todo">
      <b-table-column field="title" label="Title">
        <div :class="['todo', { editing: todo.row == editedTodo }]">
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
</template>

<script>
import { useTodoListActions } from '../composables/use-todo-list-actions';

export default {
  props: {
    filteredTodos: {
      type: Array,
      required: true,
    },
    statuses: {
      type: Array,
      required: true,
    },
    statusesWithAll: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { editedTodo, removeTodo, editTodo, doneEdit, cancelEdit } = useTodoListActions();

    return {
      // Mutable state
      editedTodo,
      // Functions
      removeTodo,
      editTodo,
      doneEdit,
      cancelEdit,
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
