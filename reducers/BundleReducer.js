import {
	BUNDLE_LIST_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    list: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
        case BUNDLE_LIST_FETCH_SUCCESS:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state;
    }
};
