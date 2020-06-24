export const useGetStatuses = () => {
  const getStatuses = () => {
    return [
      { code: 'todo', label: 'Todo' },
      { code: 'doing', label: 'Doing' },
      { code: 'done', label: 'Done' },
    ];
  };

  return {
    getStatuses,
  };
};
