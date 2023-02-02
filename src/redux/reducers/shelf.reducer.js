const shelf = (state = [], action) => {
  switch (action.type) {
    case 'SET_SHELF':
      return action.payload;
    case 'ADD_TO_SHELF':
      return [...state];
    // case 'DELETE_ITEM':
    //   return [...state];
    default:
      return state;

  }
};

export default shelf;
