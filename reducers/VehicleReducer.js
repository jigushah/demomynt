import _ from 'lodash';
import {
    VEHICLE_MAKE_CHANGED,
    VEHICLE_MODEL_CHANGED,
    VEHICLE_LIST_FETCH_SUCCESS,
    VEHICLE_MAKE_LIST_FETCH_SUCCESS,
    VEHICLE_MODEL_LIST_FETCH_SUCCESS,
    VEHICLE_ADD_REQUEST,
    VEHICLE_ADD_SUCCESS,
    VEHICLE_ADD_ERROR,
    SET_VEHICLE
} from '../actions/types';

const INITIAL_STATE = {
    list: {},
    new: {
        make: '',
        model: {},
        year: '',
        color: '',
        licensePlate: '',
        sedan: true
    },
    makes: [],
    models: [],
    isLoading: false,
    lastVehicle: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
        case VEHICLE_MAKE_CHANGED:

            return {
                ...state,
                new: {
                    ...state.new,
                    make: action.payload,
                    model: INITIAL_STATE.new.model
                }
            };
        case VEHICLE_MODEL_CHANGED:

            return {
                ...state,
                new: {
                    ...state.new,
                    model: _.find(state.models[state.new.make], { id: action.payload })
                }
            };
        case VEHICLE_MAKE_LIST_FETCH_SUCCESS:

            return {
                ...state,
                makes: action.payload
            };
        case VEHICLE_MODEL_LIST_FETCH_SUCCESS:

            return {
                ...state,
                models: action.payload
            };
        case VEHICLE_LIST_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: action.payload,
                new: { ...INITIAL_STATE.new },
            };
        case SET_VEHICLE:
            const temp = _.toArray(state.list);
            return{
                ...state,
                lastVehicle: temp[temp.length-1],
            };
        case VEHICLE_ADD_ERROR:
          return { ...state, isLoading: false, error: action.payload };

        case VEHICLE_ADD_REQUEST:
          return { ...state, isLoading: true };

        default:
            return state;
    }
};
