<template>
  <section class="section">
    <div class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ filteredTodos.length }}</strong> Todos
          </p>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <b-input v-model="searchText" placeholder="Search..." type="search" icon="search" />
            </p>
            <p class="control">
              <button class="button">
                Search
              </button>
            </p>
          </div>
        </div>
      </div>
      <!-- Right side -->
      <div class="level-right">
        <b-field>
          <b-radio-button v-model="selectedStatus" name="status-filter" native-value="">
            All
          </b-radio-button>
          <b-radio-button
            v-for="status in statuses"
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
        <b-field>
          <b-input v-model="newTodo" placeholder="Add Todo" />
        </b-field>
      </form>
    </div>
    <div class="container">
      <b-table :data="filteredTodos" striped hoverable>
        <template v-slot="todo">
          <b-table-column field="name" label="name">
            {{ todo.row.name }}
          </b-table-column>
          <b-table-column label="Status" centered width="120">
            <b-select v-model="todo.row.status" placeholder="Status">
              <option v-for="status in statuses" :value="status.code" :key="status.code">
                {{ status.label }}
              </option>
            </b-select>
          </b-table-column>
          <b-table-column label="Delete" centered width="80">
            <b-button @click="deleteTodo(todo.index)">
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
        { name: 'Do the dishes', status: 'todo' },
        { name: 'Take out the trash', status: 'doing' },
        { name: 'Finish doing laundry', status: 'done' },
      ],
      newTodo: '',
      selectedStatus: '',
      searchText: '',
    };
  },
  computed: {
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
      this.todos.push({ name: this.newTodo, status: 'todo' });
      this.newTodo = '';
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="scss"></style>
