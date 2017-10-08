import {
	USER_EMAIL_CHANGED,
	USER_PASSWORD_CHANGED,
  USER_START_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNOUT,
  APP_SET_USER_DATA,
  SEND_RESET_CODE_REQUEST,
  SEND_RESET_CODE_SUCCESS,
  SEND_RESET_CODE_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  CONFIRM_CODE_REQUEST,
  CONFIRM_CODE_SUCCESS,
  CONFIRM_CODE_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  REQUEST_MYNT,
  REQUEST_MYNT_SUCCESS,
  REQUEST_MYNT_FAILURE,

  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
	firstName: '',
	lastName: '',
	accessToken: '',
	email: '',
  signupError: '',
  loginError: '',
  requestMyntSuccess: '',
  requestMyntError: '',
  error: '',
  resetToken: null,
  isLoggedIn: false,
  isLoggingIn: false,
  isLoading: false,
  phone: '',
  sendText: 1,
  sendEmail: 1
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
        case APP_SET_USER_DATA:
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                accessToken: action.payload.accessToken,
                email: action.payload.email,
                phone: action.payload.phone,
                sendText: action.payload.sendText,
                sendEmail: action.payload.sendEmail,
                isLoggedIn: true,
                isLoggingIn: false
            };
        case USER_EMAIL_CHANGED:
            return {
                ...state,
                email: action.payload
            };
        case USER_PASSWORD_CHANGED:
            return {
                ...state,
                password: action.payload
            };
        case USER_START_LOGIN:
            return {
                ...state,
                loginError: '',
                isLoggingIn: true,
                isLoading: true
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loginError: '',
                password: '',
                isLoggedIn: true,
                isLoggingIn: false,
                isLoading: false
            };
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loginError: action.payload,
                password: '',
                isLoggingIn: false,
                isLoading: false
            };
        case SIGNUP_REQUEST:
          return { ...state, isLoading: true };
				case SIGNUP_SUCCESS:
          return { ...state, signupError: '', isLoggedIn: true, isLoading: false }
				case SIGNUP_FAILURE:
					return { ...state, signupError: (action.payload && action.payload[0]), isLoading: false }
        case USER_SIGNOUT:
            return INITIAL_STATE;

        case CONFIRM_CODE_REQUEST:
        case SEND_RESET_CODE_REQUEST:
        case RESET_PASSWORD_REQUEST:
          return { ...state, isLoading: true };
        case SEND_RESET_CODE_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
          return { ...state, isLoading: false, error: '' };
        case CONFIRM_CODE_SUCCESS:
          return { ...state, resetToken: action.payload, isLoading: false };
        case CONFIRM_CODE_FAILURE:
        case SEND_RESET_CODE_FAILURE:
        case RESET_PASSWORD_FAILURE:
          return { ...state, isLoading: false, error: action.payload };
        case REQUEST_MYNT:
          return {
            ...state,
            isLoading: true,
            requestMyntError: '',
            requestMyntSuccess: ''
          };
        case REQUEST_MYNT_SUCCESS:
          return {
            ...state,
            isLoading: false,
            requestMyntError: '',
            requestMyntSuccess: action.payload
          };
        case REQUEST_MYNT_FAILURE:
          return {
            ...state,
            isLoading: false,
            requestMyntError: action.payload,
            requestMyntSuccess: ''
          };

        case USER_EDIT_REQUEST:
          return { ...state, isLoading: true };

        case USER_EDIT_SUCCESS:
          return {
            ...state,
            isLoading: false,
            firstName: action.payload.first_name,
            lastName: action.payload.last_name,
            email: action.payload.email,
          };

        case USER_EDIT_ERROR:
          return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
