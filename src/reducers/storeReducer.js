import agent from '../agent';

const ADD_STORE = 'ADD_STORE';
const UPDATE_SPIDERS = 'ADD_SPIDER';

const defaultState = {
  stores: [
    {
      href:
        'https://raw.githubusercontent.com/InfiniteXyy/spreader/master/assets/data/books.json',
      title: '默认仓库',
      spiders: []
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
    default:
      return state;
  }
};
