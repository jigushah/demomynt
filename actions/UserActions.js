import { NavigationActions } from '@expo/ex-navigation';
import {
	USER_EMAIL_CHANGED,
	USER_PASSWORD_CHANGED,
  USER_START_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNOUT,
  APP_SET_USER_DATA,
  SIGNUP_REQUEST,
	SIGNUP_FAILURE,
	SIGNUP_SUCCESS,
  SEND_RESET_CODE_REQUEST,
  SEND_RESET_CODE_SUCCESS,
  SEND_RESET_CODE_FAILURE,
  CONFIRM_CODE_REQUEST,
  CONFIRM_CODE_FAILURE,
  CONFIRM_CODE_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  REQUEST_MYNT,
  REQUEST_MYNT_SUCCESS,
  REQUEST_MYNT_FAILURE,

  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_ERROR,
} from './types';
import Router from '../navigation/Router';
import ApiManager from '../api/manager';
import axios from 'axios';

export const emailChanged = (text) => {
    return { type: USER_EMAIL_CHANGED, payload: text };
};

export const passwordChanged = (text) => {
    return { type: USER_PASSWORD_CHANGED, payload: text };
};

export const loginRequest = () => {
  return { type: USER_START_LOGIN };
}

export const loginSuccess = () => {
  return { type: USER_LOGIN_SUCCESS };
}

export const loginFailure = (errors) => {
  return { type: USER_LOGIN_FAIL, payload: errors };
}

export const signupRequest = () => {
  return { type: SIGNUP_REQUEST };
}

export const signupSuccess = () => {
  return { type: SIGNUP_SUCCESS };
}

export const signupFailure = (errors) => {
	return { type: SIGNUP_FAILURE, payload: errors };
}

export const signOutUser = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_SIGNOUT });
        storage.remove({ key: 'user' })
            .then(() => dispatch(NavigationActions.replace('root', Router.getRoute('login'))));
    };
};

/**
 * Login User
 */
export const loginUser = (email, password) => {
    return (dispatch, getState) => {
      if (!email || !password) {
        return dispatch(loginFailure('Email and password are both required'));
      }

      const path = ApiManager.buildRoute('login');
      dispatch(loginRequest());

      axios
        .post(path, { email, password })
        .then(response => {
          storage.save({
            key: 'user',
            rawData: {
              accessToken: response.data.auth_key,
              firstName: response.data.first_name,
              lastName: response.data.last_name,
              email: response.data.email,
              phone: response.data.phone,
              sendEmail: response.data.send_email,
              sendText: response.data.send_text
            }
          })
          .then(() => {
            dispatch({
                type: APP_SET_USER_DATA,
                payload: {
                    accessToken: response.data.auth_key,
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    email,
                    phone: response.data.phone,
                    sendEmail: response.data.send_email,
                    sendText: response.data.send_text
                }
            });
            dispatch(loginSuccess());
            dispatch(NavigationActions.replace('root', Router.getRoute('rootNavigation')));
          })
          .catch((e) => {
            throw new Error(errorMessage);
          });
        })
        .catch(err => {
          return dispatch(loginFailure(err.response.data.message));
        });
    };
};

/**
 * Signup User
 */
export const signupUser = ({first_name, last_name, phone, email, password}) => {
	const errorMessage = 'Signup Failed'; // this should be handled by server side
	const path = ApiManager.buildRoute('userSignup');

	return (dispatch, getState) => {
    dispatch(signupRequest())

    axios
      .post(path, {
        first_name,
        last_name,
        phone,
        email,
        password
      })
      .then(response => {
        storage.save({
            key: 'user',
            rawData: {
                accessToken: response.data.auth_key,
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                email: response.data.email
            }
        })
        .then(() => {
            dispatch({
                type: APP_SET_USER_DATA,
                payload: {
                    accessToken: response.data.auth_key,
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    email: response.data.email
                }
            });
            dispatch(signupSuccess());
            dispatch(NavigationActions.replace('root', Router.getRoute('rootNavigation')));
        })
        .catch((e) => {
            throw new Error(errorMessage);
        });
      })
      .catch(err => {
        dispatch(signupFailure(err.response.data));
      });
	}
}

/*
 * Forgot Password
 */
export const sendCodeRequest = () => {
  return { type: SEND_RESET_CODE_REQUEST };
}

export const sendCodeSuccess = () => {
  // Im sure this will use a payload eventually
  return { type: SEND_RESET_CODE_SUCCESS, payload: [] };
}

export const sendCodeFailure = (error) => {
  return { type: SEND_RESET_CODE_FAILURE, payload: error };
}

export const sendCode = (email, router) => {
  return (dispatch, getState) => {
    if (!email) return dispatch(sendCodeFailure('Email is required'));

    dispatch(sendCodeRequest());
    const path = ApiManager.buildRoute('sendCode');

    axios
      .post(path, {email})
      .then(response => {
        dispatch(sendCodeSuccess('Code was successfully sent!'))
        router.push('confirmCode');
      })
      .catch(err => {
        debugger;
        dispatch(sendCodeFailure(err.response.data.message));
      });
  }
}

/**
 * Confirm Code
 */
export const confirmCodeRequest = () => {
  return { type: CONFIRM_CODE_REQUEST };
}

export const confirmCodeSuccess = (token) => {
  return { type: CONFIRM_CODE_SUCCESS, payload: token };
}

export const confirmCodeFailure = (error) => {
  return { type: CONFIRM_CODE_FAILURE, payload: error };
}

export const confirmCode = (code, router) => {
  return (dispatch, getState) => {
    if (!code) return dispatch(sendCodeFailure('Code is required'));

    dispatch(sendCodeRequest());
    const path = ApiManager.buildRoute('confirmCode');

    axios.post(path, {code})
      .then(response => {
        dispatch(confirmCodeSuccess(response.data.payload.token))
        router.push('resetPassword');
      })
      .catch(err => {
        dispatch(confirmCodeFailure(err.response.data.message));
      });
  }
}

/**
 * Password Reset
 */
export const resetPasswordRequest = () => {
  return { type: RESET_PASSWORD_REQUEST };
}

export const resetPasswordSuccess = () => {
  return { type: RESET_PASSWORD_SUCCESS };
}

export const resetPasswordFailure = (error) => {
  return { type: RESET_PASSWORD_FAILURE, payload: error };
}

export const resetPassword = ({ token, password, confirmPass }, router) => {
  return (dispatch, getState) => {
    if (!password) return dispatch(sendCodeFailure('Password is required'));
    if (password !== confirmPass) return dispatch(sendCodeFailure('Passwords must match'));

    dispatch(sendCodeRequest());
    const path = ApiManager.buildRoute('passReset');

    axios.post(path, {token, password})
      .then(response => {
        dispatch(resetPasswordSuccess())
        router.push('login');
      })
      .catch(err => {
        dispatch(resetPasswordFailure(err.response.data.message));
      });
  }
}

export const requestMynt = (zipcode) => {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_MYNT });
    if (!zipcode) return dispatch({ type: REQUEST_MYNT_FAILURE, payload: 'Zipcode is required' });

    const path = ApiManager.buildRoute('requestMynt', getState().user.accessToken);

    axios
      .post(path, { zipcode })
      .then(response => {
        dispatch({ type: REQUEST_MYNT_SUCCESS, payload: 'Thank you, you will be notified once we are in your area' });
      })
      .catch(err => {
        dispatch({ type: REQUEST_MYNT_FAILURE, payload: err.response.message });
      });
  };
};

/**
 * Update Profile
 */
export const update = (user, router) => {
  return (dispatch, getState) => {
    const path = ApiManager.buildRoute('updateProfile', getState().user.accessToken);

    dispatch({ type: USER_EDIT_REQUEST });

    axios
      .put(path, user)
      .then(response => {
        dispatch({ type: USER_EDIT_SUCCESS, payload: response.data });
        router.push('profile');
      })
      .catch(err => {
        dispatch({ type: USER_EDIT_ERROR, payload: (err.message) ? err.message : err.response.data.message });
      });
  }
}
