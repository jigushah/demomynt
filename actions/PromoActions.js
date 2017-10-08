import axios from 'axios';
import {
  PROMO_LIST_FETCH_SUCCESS,

  PROMO_ADD_REQUEST,
  PROMO_ADD_SUCCESS,
  PROMO_ADD_ERROR,
} from './types';
import ApiManager from '../api/manager';

export const promoListRefresh = (data) => {
  return { type: PROMO_LIST_FETCH_SUCCESS, payload: data };
};

export const addPromoRequest = () => {
  return { type: PROMO_ADD_REQUEST };
};

export const addPromoSuccess = (promo) => {
  return { type: PROMO_ADD_SUCCESS, payload: promo };
};

export const addPromoError = (error) => {
  return { type: PROMO_ADD_ERROR, payload: error };
};

export const fetchPromos = () => {
  return (dispatch, getState) => {
    const path = ApiManager.buildRoute('fetchPromos', getState().user.accessToken);
    return fetch(path, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => ApiManager.checkStatus(res, 'Invalid credentials.'))
    .then(res => res.json())
    .then(json => {
      return dispatch(promoListRefresh(json));
    })
    .catch(error => {
      throw new Error(error);
    });
  };
};

export const addPromo = (promo, router) => {
  return (dispatch, getState) => {
    const path = ApiManager.buildRoute('addPromo', getState().user.accessToken);
    dispatch(addPromoRequest());

    axios
      .post(path, { promotional_id: promo.code })
      .then(response => {
        dispatch(fetchPromos());
        dispatch(addPromoSuccess());
        router.pop();
      })
      .catch(err => {
        dispatch(addPromoError(err.response.data.message));
      });
    };
};
