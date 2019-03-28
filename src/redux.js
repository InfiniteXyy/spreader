import { combineReducers } from 'redux';

import NavigationExperimental from 'react-native-navigation-experimental-compat';

const NavigationStateUtils = NavigationExperimental.StateUtils;

const NAV_PUSH = 'NAV_PUSH';
const NAV_POP = 'NAV_POP';

const initialNavState = {
  index: 0,
  routes: [{ key: 'BookList' }]
};

function navigationState(state = initialNavState, action) {
  switch (action.type) {
    case NAV_PUSH:
      if (state.routes[state.index].key === (action.state && action.state.key))
        return state;
      return NavigationStateUtils.push(state, action.state);

    case NAV_POP:
      if (state.index === 0 || state.routes.length === 1) return state;
      return NavigationStateUtils.pop(state);

    default:
      return state;
  }
}

export default combineReducers({
  navigationState
});

export function navigatePush(route, props) {
  console.log(props)
  return {
    type: NAV_PUSH,
    state: {
      ...route,
      props
    }
  };
}

export function navigatePop() {
  return {
    type: NAV_POP
  };
}
