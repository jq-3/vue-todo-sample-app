export const useGetStatuses = () => {
  const getStatuses = () => {
    // APIなどから取得する想定
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
