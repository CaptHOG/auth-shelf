
const shelf = (state = [], action) => {
  switch (action.type) {
    case "SET_SHELF":
      return action.payload;
    case "ADD_TO_SHELF":
      return [...state];
    default:
      return state;

  }
};

export default shelf;
