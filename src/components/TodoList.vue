<template>
  <section class="section">
    <div class="container">
      <form @submit.prevent="addTodo">
        <b-field>
          <b-input v-model="newTodo" placeholder="Add Todo" />
        </b-field>
      </form>
    </div>
    <div class="container">
      <div>
        <b-table :data="todos" striped hoverable>
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
    };
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
