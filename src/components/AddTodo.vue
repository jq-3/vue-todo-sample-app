<template>
  <form @submit.prevent="addTodo">
    <b-input v-model="newTodo" placeholder="Add Todo" />
  </form>
</template>

<script>
import { useTodoListActions } from '../composables/use-todo-list-actions';

export default {
  setup() {
    const { newTodo, addTodo } = useTodoListActions();

    return {
      newTodo,
      addTodo,
    };
  },
};
</script>
