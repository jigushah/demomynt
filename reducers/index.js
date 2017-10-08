import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { NavigationReducer, createNavigationEnabledStore } from '@expo/ex-navigation';
import UserReducer from './UserReducer';
import LocationReducer from './LocationReducer';
import BookingReducer from './BookingReducer';
import VehicleReducer from './VehicleReducer';
import PaymentReducer from './PaymentReducer';
import BundleReducer from './BundleReducer';
import ServiceReducer from './ServiceReducer';
import PromoReducer from './PromoReducer';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const Store = createStoreWithNavigation(
    combineReducers({
        user: UserReducer,
        location: LocationReducer,
        vehicle: VehicleReducer,
        payment: PaymentReducer,
        bundle: BundleReducer,
        service: ServiceReducer,
        booking: BookingReducer,
        promo: PromoReducer,
        navigation: NavigationReducer,
        form: formReducer
    }),
    {},
    applyMiddleware(ReduxThunk)
);

export default Store;
