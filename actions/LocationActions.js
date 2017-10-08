import {
    LOCATION_LIST_FETCH_SUCCESS,

    LOCATION_ADD_REQUEST,
    LOCATION_ADD_SUCCESS,
    LOCATION_ADD_ERROR,

    LOCATION_REMOVE_REQUEST,
    LOCATION_REMOVE_SUCCESS,
    LOCATION_REMOVE_ERROR,
} from './types';
import ApiManager from '../api/manager';

export const fetchLocations = () => {
    return (dispatch, getState) => {
        const path = ApiManager.buildRoute('fetchLocations', getState().user.accessToken);
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
            return dispatch({ type: LOCATION_LIST_FETCH_SUCCESS, payload: json });
        })
        .catch(error => {
            throw new Error(error);
        });
    };
};

/**
 * Add Location
 */
export const addLocationRequest = () => {
  return { type: LOCATION_ADD_REQUEST };
};

export const addLocationSuccess = (location) => {
  return { type: LOCATION_ADD_SUCCESS, payload: action };
};

export const addLocationError = (error) => {
  return { type: LOCATION_ADD_ERROR, payload: error };
};

export const add = (location, router) => {
  return (dispatch, getState) => {
    const path = ApiManager.buildRoute('addLocation', getState().user.accessToken);

    dispatch(addLocationRequest());

    setTimeout(() => {
      dispatch(addLocationSuccess([]));
      // router.push('paymentModal')
    }, 2000)
  }
};

/**
 * Remove Location
 */
export const removeLocationRequest = () => {
  return { type: LOCATION_REMOVE_REQUEST };
};

export const removeLocationSuccess = (location) => {
  return { type: LOCATION_REMOVE_SUCCESS, payload: location };
};

export const removeLocationError = (error) => {
  return { type: LOCATION_REMOVE_ERROR, payload: error };
};

export const remove = (location, router) => {
  return (dispatch, getState) => {
    // const path = ApiManager.buildRoute('removeLocation', getState().user.accessToken);

    dispatch(removeLocationRequest());

    setTimeout(() => {
      dispatch(removeLocationSuccess([]));
      // router.push('paymentModal')
    }, 5000)
  }
}
