import { NavigationActions } from '@expo/ex-navigation';
import axios from 'axios';
import {
    VEHICLE_MAKE_CHANGED,
    VEHICLE_MODEL_CHANGED,
    VEHICLE_LIST_FETCH_SUCCESS,
    VEHICLE_MAKE_LIST_FETCH_SUCCESS,
    VEHICLE_MODEL_LIST_FETCH_SUCCESS,
    VEHICLE_ADD_REQUEST,
    SET_VEHICLE,
    NEW_BOOKING_VEHICLE_CHANGED,
    VEHICLE_ADD_SUCCESS,
    VEHICLE_ADD_ERROR
} from './types';
import ApiManager from '../api/manager';

export const addVehicleRequest = () => {
  return { type: VEHICLE_ADD_REQUEST };
};

export const addVehicleSuccess = (vehicle) => {
  return { type: VEHICLE_ADD_SUCCESS, payload: vehicle };
};

export const addVehicleError = (errors) => {
  return { type: VEHICLE_ADD_ERROR, payload: errors };
};

export const addVehicle = (vehicle,set = false) => {

  return (dispatch, getState) => {
    const path = ApiManager.buildRoute('addVehicle', getState().user.accessToken);

    dispatch(addVehicleRequest());

    axios
      .post(path, vehicle)
      .then(response => {
          dispatch(fetchVehicles());
        const navigatorUID = getState().navigation.currentNavigatorUID;
          if (set) {
              dispatch({ type: SET_VEHICLE, payload: response });

              dispatch({ type: NEW_BOOKING_VEHICLE_CHANGED, payload: response.data.data })
          }
          dispatch(NavigationActions.pop(navigatorUID),{lastVehicle: vehicle});

      })
      .catch(err => {
          debugger;
        console.log('err', err.response.data.message);
        // TODO: Need to return react-form error here
        // TODO: Need to parse the errors correct
        dispatch(addVehicleError(err.response.data.message));
      });
  };
};

export const fetchVehicles = () => {
    return (dispatch, getState) => {
        const path = ApiManager.buildRoute('fetchVehicles', getState().user.accessToken);
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
            return dispatch({ type: VEHICLE_LIST_FETCH_SUCCESS, payload: json });
        })
        .catch(error => {
            throw new Error(error);
        });
    };
};

export const fetchMakes = () => {
    return (dispatch, getState) => {
        const path = ApiManager.buildRoute('fetchVehicleMakes', getState().user.accessToken);
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
            return dispatch({ type: VEHICLE_MAKE_LIST_FETCH_SUCCESS, payload: json });
        })
        .catch(error => {
            throw new Error(error);
        });
    };
};

export const fetchModels = () => {
    return (dispatch, getState) => {
        const path = ApiManager.buildRoute('fetchVehicleModels', getState().user.accessToken);
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
            return dispatch({ type: VEHICLE_MODEL_LIST_FETCH_SUCCESS, payload: json });
        })
        .catch(error => {
            throw new Error(error);
        });
    };
};

export const makeChanged = (value) => {
    return {
        type: VEHICLE_MAKE_CHANGED,
        payload: value
    };
};

export const modelChanged = (value) => {
    return {
        type: VEHICLE_MODEL_CHANGED,
        payload: value
    };
};

export const remove = (vehicle) => {
  return (dispatch, getState) => {
    const path = ApiManager.buildRoute('deleteVehicle', getState().user.accessToken);
    dispatch(addVehicleRequest());
    return axios({
        method: 'delete',
        url: path,
        data: { id: vehicle.id }
      })
      .then(response => {
        dispatch(fetchVehicles());
      })
      .catch(err => {
        console.log('err from delete', err);
      });
  };
}
