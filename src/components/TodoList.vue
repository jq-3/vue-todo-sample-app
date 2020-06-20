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
                <option value="1">Todo</option>
                <option value="2">Doing</option>
                <option value="3">Done</option>
              </b-select>
            </b-table-column>
            <b-table-column label="Delete" centered width="80">
              <b-button @click="deleteTodo(todo.index, todo)">
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
      todos: [
        { name: 'Do the dishes', status: 1 },
        { name: 'Take out the trash', status: 2 },
        { name: 'Finish doing laundry', status: 3 },
      ],
      newTodo: '',
    };
  },
  methods: {
    addTodo() {
      this.todos.push({ name: this.newTodo, status: 1 });
      this.newTodo = '';
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="scss"></style>
