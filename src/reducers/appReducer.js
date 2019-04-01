export const SET_THEME = 'SET_THEME';

export function addNum() {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: SET_THEME
      });
    }, 1000);
  };
}

const defaultState = {
  num: 1
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, num: state.num + 1 };
    default:
      return state;
  }
};
