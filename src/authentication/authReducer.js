import { handle } from 'redux-pack';
import * as actionTypes from './authActionTypes';

const intitialState = {
  isAuthLoading: false,
  loginError: false,
  isAuthenticated: false,
};

const authReducer = (state = intitialState, action) => {
  const { type } = action;
  switch (type) {
    case actionTypes.LOGIN:
      return handle(state, action, {
        start: (s) => ({
          ...s,
          isAuthLoading: true,
        }),
        finish: (s) => ({
          ...s,
          isAuthLoading: false,
        }),
        failure: (s) => ({
          ...s,
          isAuthLoading: false,
        }),
      });

    case actionTypes.REFRESH_APP: {
      return {
        ...state,
        state: intitialState,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
