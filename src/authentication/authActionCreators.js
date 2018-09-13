import * as actionTypes from './authActionTypes';

export const login = ({ username, password }) =>
  (dispatch, getState, { api }) =>
    dispatch({
      type: actionTypes.LOGIN,
      promise: api.post('/login/', {
        username,
        password,
      }),
    });

export const logout = () =>
  (dispatch, getState, { api }) =>
    dispatch({
      type: actionTypes.LOGOUT,
      promise: api.get('/logout/'),
    });
