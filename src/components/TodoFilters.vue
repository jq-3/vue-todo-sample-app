<template>
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
</template>

<script>
import { ref, watchEffect } from '@vue/composition-api';

export default {
  props: {
    filteredTodos: {
      type: Array,
      required: true,
    },
    statusesWithAll: {
      type: Array,
      required: true,
    },
  },
  setup(_, context) {
    const selectedStatus = ref('');
    const searchText = ref('');

    watchEffect(() => {
      context.emit('update-filter', { selectedStatus, searchText });
    });

    return {
      // Mutable state
      selectedStatus,
      searchText,
    };
  },
};
</script>
