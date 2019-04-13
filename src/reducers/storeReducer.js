import agent from '../agent';

const ADD_STORE = 'ADD_STORE';
const TOGGLE_STORE = 'TOGGLE_STORE';
const REMOVE_STORE = 'REMOVE_STORE';
const UPDATE_SPIDERS = 'ADD_SPIDER';

const defaultState = {
  stores: [
    {
      href:
        'https://raw.githubusercontent.com/InfiniteXyy/spreader/master/assets/data/books.json',
      title: '默认仓库',
      spiders: [],
      visible: true
    }
  ]
};

export function loadStore(store) {
  return async dispatch => {
    let data = await agent.get(store.href);
    data = JSON.parse(data);
    dispatch({
      type: UPDATE_SPIDERS,
      data,
      store
    });
  };
}

export function toggleStore(store, visible) {
  if (!visible)
    return {
      type: TOGGLE_STORE,
      visible,
      storeHref: store.href
    };
  else {
    return dispatch => {
      dispatch({
        type: TOGGLE_STORE,
        visible,
        storeHref: store.href
      });
      dispatch(loadStore());
    };
  }
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_SPIDERS:
      return {
        ...state,
        stores: state.stores.map(store => {
          if (store.href === action.store.href) {
            return {
              ...store,
              ...action.data
            };
          }
          return store;
        })
      };
    case TOGGLE_STORE:
      return {
        ...state,
        stores: state.stores.map(store => {
          if (store.href === action.storeHref) {
            return { ...store, visible: action.visible };
          }
          return store;
        })
      };
    default:
      return state;
  }
};
