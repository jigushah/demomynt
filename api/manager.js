import axios from 'axios';
import { NavigationActions } from '@expo/ex-navigation';
import { USER_SIGNOUT } from '../actions/types'
import Config from '../config';

const ERROR_STATUSES = [401, 403];

export default class ApiManager {
    static checkStatus = (response, error) => {
        if (response.ok) {
            return response;
        }

        throw new Error(error);
    };

    static buildRoute = (routeName, token = '') => {
        let url = `${Config.api.baseUrl}/${Config.api.version}/`;
        const authKey = Config.api.authKey;
        const routeDefinition = Config.api[routeName];
        url += routeDefinition.path;
        if (routeDefinition.auth === true) {
            url += `?${authKey}=${token}`;
        }
        return url;
    }

    static handleError = (dispatch, actionType, error, router) => {
      dispatch({ type: actionType, payload: (error.message) ? error.message : error.response.data.message });

      if (error.response && ERROR_STATUSES.indexOf(error.response.status) > -1) {
        dispatch({ type: USER_SIGNOUT });
        storage.remove({ key: 'user' })
            .then(() => router.push('login'));
      }
    }
}
