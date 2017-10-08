import {
    DATE_AND_TIME_LIST_FETCH_SUCCESS
} from './types';
import ApiManager from '../api/manager';

export const fetchDateAndTimes = () => {
    return (dispatch, getState) => {
        const path = ApiManager.buildRoute('fetchDateAndTimes', getState().user.accessToken);
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
            return dispatch({ type: DATE_AND_TIME_LIST_FETCH_SUCCESS, payload: json });
        })
        .catch(error => {
            throw new Error(error);
        });
    };
};
