import { computed, reactive } from '@vue/composition-api';

export const useStatusStore = (statuses = []) => {
  const state = reactive({
    statuses: statuses,
    statusesWithAll: computed(() => [{ code: '', label: 'All' }, ...state.statuses]),
  });

  return {
    get statuses() {
      return state.statuses;
    },
    get statusesWithAll() {
      return state.statusesWithAll;
    },
  };
};
