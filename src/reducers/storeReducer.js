import agent from '../agent';

const ADD_STORE = 'ADD_STORE';
const ADD_SPIDERS = 'ADD_SPIDER';

const defaultState = {
  stores: [
    {
      href:
        'https://raw.githubusercontent.com/InfiniteXyy/spreader/master/assets/data/books.json',
      title: '官方仓库'
    }
  ],
  spiders: []
};

export function loadStore(store) {
  return async dispatch => {
    let data = await agent.get(store.href);
    data = JSON.parse(data);
    dispatch({
      type: ADD_SPIDERS,
      payload: data.map(i => ({ ...i, source: store.href }))
    });
  };
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_SPIDERS:
      return { ...state, spiders: [...action.payload] };
    default:
      return state;
  }
};
