const getResource = () => {
  return {
    db: {
      getOneUser: () => {
        return {
          id: 1,
        };
      },
      close: async () => {
        // Close the database
      },
    },
  };
};

const main = async () => {
  const resource = await getResource();

  try {
    const user = resource.db.getOneUser();
  } catch (e) {
    console.error(e);
  } finally {
    await resource.db.close();
  }
};

/*
  The problem is that, we need to use try catch everywhere, otherwise we will have so many connections
*/

export {};
