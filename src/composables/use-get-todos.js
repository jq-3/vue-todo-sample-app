export const useGetTodos = () => {
  const getTodos = () => {
    // APIなどから取得する想定
    return [
      { uid: 1, title: 'Do the dishes', status: 'todo' },
      { uid: 2, title: 'Take out the trash', status: 'doing' },
      { uid: 3, title: 'Finish doing laundry', status: 'done' },
    ];
  };

  return {
    getTodos,
  };
};
