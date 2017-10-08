import {
    BUNDLE_LIST_FETCH_SUCCESS
} from './types';
import ApiManager from '../api/manager';

export const fetchBundles = () => {
    return (dispatch, getState) => {
        const path = ApiManager.buildRoute('fetchBundles', getState().user.accessToken);
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
            return dispatch({ type: BUNDLE_LIST_FETCH_SUCCESS, payload: json });
        })
        .catch(error => {
            throw new Error(error);
        });
    };
};
