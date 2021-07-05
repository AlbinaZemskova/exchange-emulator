const initialState = {
  history: [],
};

function history(state = initialState, action) {
  switch (action.type) {
    case 'ADD_HISTORY':
    case 'LOAD_HISTORY_OF_DEAL':
      return {
        ...state,
        history: action.history,
      };
    default:
      return state;
  }
}

export default history;
