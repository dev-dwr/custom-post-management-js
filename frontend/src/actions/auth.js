import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

//if action creators are async then we have to use redux-thunk, we have an function that returns and async function with dispatch
export const signIn = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.error(error);
  }
};

export const signUp = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.error(error);
  }
};