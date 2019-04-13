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
      coverImg:
        'data:image/png;base64,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',
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
      spiders: data,
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
            return { ...store, spiders: action.spiders };
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
