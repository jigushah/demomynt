import {
	PROMO_LIST_FETCH_SUCCESS,

  PROMO_ADD_REQUEST,
  PROMO_ADD_SUCCESS,
  PROMO_ADD_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  list: [],
  new: {},
  isLoading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case PROMO_LIST_FETCH_SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    case PROMO_ADD_REQUEST:
      return { ...state, isLoading: true };

    case PROMO_ADD_SUCCESS:
      return { ...state, isLoading: false };

    case PROMO_ADD_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    default:
        return state;
    }
};
