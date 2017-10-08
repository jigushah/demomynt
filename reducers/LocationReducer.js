import {
	LOCATION_LIST_FETCH_SUCCESS,

  LOCATION_ADD_REQUEST,
  LOCATION_ADD_SUCCESS,
  LOCATION_ADD_ERROR,

  LOCATION_REMOVE_REQUEST,
  LOCATION_REMOVE_SUCCESS,
  LOCATION_REMOVE_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  list: [],
  new: {},
  isLoading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
        case LOCATION_LIST_FETCH_SUCCESS:
            return {
                ...state,
                list: action.payload
            };

        case LOCATION_REMOVE_REQUEST:
        case LOCATION_ADD_REQUEST:
          return { ...state, isLoading: true };

        case LOCATION_ADD_SUCCESS:
          return { ...state, list: action.payload, isLoading: false };

        case LOCATION_REMOVE_SUCCESS:
          // const list = state.list.filter(loc => loc._id === action.payload._id);
          return { ...state, list: [], isLoading: false };

        case LOCATION_REMOVE_ERROR:
        case LOCATION_ADD_ERROR:
          return { ...state, error: action.payload, isLoading: false };

        default:
            return state;
    }
};
