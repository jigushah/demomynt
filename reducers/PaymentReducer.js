import {
	PAYMENT_LIST_FETCH_SUCCESS,

  PAYMENT_REMOVE_REQUEST,
  PAYMENT_REMOVE_SUCCESS,
  PAYMENT_REMOVE_ERROR,

  PAYMENT_ADD_REQUEST,
  PAYMENT_ADD_SUCCESS,
  PAYMENT_ADD_ERROR,

  PAYMENT_UPDATE_REQUEST,
  PAYMENT_UPDATE_SUCCESS,
  PAYMENT_UPDATE_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  list: [],
  new: {},
  isLoading: false,
  error: null,
    lastPayment: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
        case PAYMENT_LIST_FETCH_SUCCESS:
            return {
                ...state,
                list: action.payload
            };
        case PAYMENT_UPDATE_REQUEST:
        case PAYMENT_ADD_REQUEST:
        case PAYMENT_REMOVE_REQUEST:
          return { ...state, isLoading: true };

        case PAYMENT_REMOVE_SUCCESS:
          return { ...state, list: action.payload, isLoading: false };

        case PAYMENT_ADD_SUCCESS:
          var list = state.list.concat([action.payload]);
          return { ...state, list: list, isLoading: false, lastPayment: action.payload };

        case PAYMENT_UPDATE_SUCCESS:
          return { ...state, list: action.payload, isLoading: false };

        case PAYMENT_UPDATE_ERROR:
        case PAYMENT_ADD_ERROR:
        case PAYMENT_REMOVE_ERROR:
          return { ...state, error: action.payload, isLoading: false };

        default:
            return state;
    }
};
