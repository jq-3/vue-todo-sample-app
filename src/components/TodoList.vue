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
      <b-table :data="filteredTodos" striped hoverable>
        <template v-slot="todo">
          <b-table-column field="name" label="Name">
            <div :class="['todo', { editing: todo.row == editedTodo }]">
              <p class="control view" @dblclick="editTodo(todo.row)">{{ todo.row.name }}</p>
              <input
                class="control input edit"
                type="text"
                v-model="todo.row.name"
                v-todo-focus="todo.row == editedTodo"
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
export default {
  data() {
    return {
      statuses: [
        { code: 'todo', label: 'Todo' },
        { code: 'doing', label: 'Doing' },
        { code: 'done', label: 'Done' },
      ],
      todos: [
        { uid: 1, name: 'Do the dishes', status: 'todo' },
        { uid: 2, name: 'Take out the trash', status: 'doing' },
        { uid: 3, name: 'Finish doing laundry', status: 'done' },
      ],
      newTodo: '',
      editedTodo: null,
      beforeEditCache: '',
      selectedStatus: '',
      searchText: '',
    };
  },
  computed: {
    statusesWithAll() {
      return [{ code: '', label: 'All' }, ...this.statuses];
    },
    filteredTodos() {
      if (this.selectedStatus === '' && this.searchText === '') {
        return this.todos;
      }

      return this.todos.filter(todo => {
        let display = true;
        if (this.searchText !== '') {
          display = todo.name.includes(this.searchText);
        }
        if (display && this.selectedStatus !== '') {
          display = todo.status === this.selectedStatus;
        }
        return display;
      });
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() === '') {
        return;
      }

      const newTodo = { uid: this.todos.length + 1, name: this.newTodo.trim(), status: 'todo' };
      this.todos.push(newTodo);
      this.newTodo = '';
    },
    removeTodo(todo) {
      const index = this.todos.findIndex(v => v.uid === todo.uid);
      this.todos.splice(index, 1);
    },
    editTodo(todo) {
      this.beforeEditCache = todo.name;
      this.editedTodo = todo;
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.name = todo.name.trim();
      if (!todo.name) {
        this.removeTodo(todo);
      }
    },
    cancelEdit(todo) {
      this.editedTodo = null;
      todo.name = this.beforeEditCache;
    },
  },
  directives: {
    'todo-focus': (el, binding) => {
      if (binding.value) {
        el.focus();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.todo {
  & > .view {
    display: block;
  }

  &.editing > .view {
    display: none;
  }

  & > .edit {
    display: none;
  }

  &.editing > .edit {
    display: block;
  }
}
</style>
