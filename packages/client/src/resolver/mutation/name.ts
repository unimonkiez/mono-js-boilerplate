export const setNameMutation = (_, { name }, { cache }) => {
  cache.writeData({
    data: {
      name,
    },
  });

  return null;
};
