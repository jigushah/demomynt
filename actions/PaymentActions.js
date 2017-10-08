import { NavigationActions } from '@expo/ex-navigation';
import {
    PAYMENT_LIST_FETCH_SUCCESS,
    PAYMENT_LIST_FETCH_ERROR,

    PAYMENT_REMOVE_REQUEST,
    PAYMENT_REMOVE_SUCCESS,
    PAYMENT_REMOVE_ERROR,
    NEW_BOOKING_PAYMENT_CHANGED,
    PAYMENT_ADD_REQUEST,
    PAYMENT_ADD_SUCCESS,
    PAYMENT_ADD_ERROR,

    PAYMENT_UPDATE_REQUEST,
    PAYMENT_UPDATE_SUCCESS,
    PAYMENT_UPDATE_ERROR,
} from './types';
import Stripe from 'react-native-stripe-api';
import axios from 'axios';
import ApiManager from '../api/manager';
import _ from 'lodash';

const apiKey = 'pk_test_WKelyR81VCDiGWlBWwLG6Ilu';
const client = new Stripe(apiKey);

export const fetchPayments = () => {
    return (dispatch, getState) => {
      const path = ApiManager.buildRoute('fetchPayments', getState().user.accessToken);

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
          return dispatch({ type: PAYMENT_LIST_FETCH_SUCCESS, payload: json });
        })
        .catch(error => ApiManager.handleError(dispatch, PAYMENT_LIST_FETCH_ERROR, error));
    };
};

/**
 * Add Payment
 */
export const addPaymentRequest = () => {
  return { type: PAYMENT_ADD_REQUEST };
};

export const addPaymentSuccess = (payment) => {
  return { type: PAYMENT_ADD_SUCCESS, payload: payment };
};

export const addPaymentError = (error) => {
  return { type: PAYMENT_ADD_ERROR, payload: error };
};


export const add = (payment, set = false) => {
  return (dispatch, getState) => {
    const path = ApiManager.buildRoute('addPayment', getState().user.accessToken);

    dispatch(addPaymentRequest());
    client
      .createToken('4242424242424242', '09', '21', '111')
      .then(response => {
        payment.token = response.id;

        axios
          .post(path, payment)
          .then(response => {


              dispatch(addPaymentSuccess(response.data));
              const navigatorUID = getState().navigation.currentNavigatorUID;

                debugger;
              if (set) {


                  dispatch({ type: NEW_BOOKING_PAYMENT_CHANGED, payload: response.data })
              }

                debugger;

              dispatch(NavigationActions.pop(navigatorUID,{refresh: true}));
          })
          .catch(error => {

            dispatch(addPaymentError((error.response) ? error.response.data.message : 'Error Occurred'));
          })
      })
      .catch(error => {
        debugger;
      });

    // return fetch(path, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(res => ApiManager.checkStatus(res, 'Invalid credentials.'))
    // .then(res => res.json())
    // .then(json => {
    //   dispatch({ type: PAYMENT_ADD_SUCCESS, payload: json });
    //   router.push('profile');
    // })
    // .catch(error => ApiManager.handleError(dispatch, PAYMENT_ADD_SUCCESS, error));
  }
};

/**
 * Update Payment
 */
export const updatePaymentRequest = () => {
  return { type: PAYMENT_UPDATE_REQUEST };
};

export const updatePaymentSuccess = (payments) => {
  return { type: PAYMENT_UPDATE_SUCCESS, payload: payments };
};

export const updatePaymentError = (error) => {
  return { type: PAYMENT_UPDATE_ERROR, payload: error };
};

export const update = (payment) => {
  return (dispatch, getState) => {
    const path = ApiManager.buildRoute('fetchPayments', getState().user.accessToken);

    dispatch(updatePaymentRequest());

    return fetch(path, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payment),
    })
    .then(res => ApiManager.checkStatus(res, 'Invalid credentials.'))
    .then(res => res.json())
    .then(json => {
      return dispatch(updatePaymentSuccess(json));
    })
    .catch(error => {
      return dispatch(updatePaymentError(error));
    });
  }
}

/**
 * Remove Payment
 */
export const removePaymentRequest = () => {
  return { type: PAYMENT_REMOVE_REQUEST };
};

export const removePaymentSuccess = (payments) => {
  return { type: PAYMENT_REMOVE_SUCCESS, payload: payments };
};

export const removePaymentError = (error) => {
  return { type: PAYMENT_REMOVE_ERROR, payload: error };
};

export const remove = (payment, router) => {
  return (dispatch, getState) => {
    const path = ApiManager.buildRoute('deletePayment', getState().user.accessToken);

    dispatch(removePaymentRequest());

    return axios({
        method: 'delete',
        url: path,
        data: { id: payment.id }
      })
      .then(response => {
        debugger;
      })
      .catch(error => {
        debugger;
      });
    // return fetch(path, {
    //     method: 'DELETE',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(_.pick(payment, 'id')),
    // })
    // .then(res => ApiManager.checkStatus(res, 'Invalid credentials.'))
    // .then(res => res.json())
    // .then(json => {
    //   debugger
    //   return dispatch(removePaymentSuccess(json));
    // })
    // .catch(error => {
    //   debugger
    //   return dispatch(removePaymentError(error));
    // });
  };
};
