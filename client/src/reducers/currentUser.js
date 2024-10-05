const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_CURRENT_USER":
      return action.payload;
    case "UPDATE_USER_CURRENT": {
      if (state) {
        return { ...state, ...action.payload };
      }
      return state;
    }
    default:
      return state;
  }
};

export default currentUserReducer;
