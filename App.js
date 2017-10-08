import Exponent from 'expo';
import React from 'react';
import { connect } from 'react-redux';
import { StackNavigation, NavigationActions } from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';
import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

import Store from './reducers';

import {
    APP_SET_USER_DATA
} from './actions/types';
import {
    fetchLocations
} from './actions/LocationActions';
import {
    fetchVehicles,
    fetchMakes,
    fetchModels
} from './actions/VehicleActions';
import {
    fetchBundles
} from './actions/BundleActions';
import {
    fetchServices
} from './actions/ServiceActions';
import {
    fetchPayments
} from './actions/PaymentActions';
import {
    fetchBookings,
    fetchDateAndTimes
} from './actions/BookingActions';
import {
  fetchPromos
} from './actions/PromoActions';

// const storage = new Storage({ size: 1000, storageBackend: AsyncStorage, defaultExpires: null, enableCache: true, sync: {} });

// global.storage = storage;

class App extends React.Component {
    state = {
        appIsReady: false,
        authNeeded: true
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // Check if user is loaded in local storage
        storage.load({ key: 'user' }).then((user) => {
            if (user) {
                Store.dispatch({
                    type: APP_SET_USER_DATA,
                    payload: user
                });
                Promise.all([
                    Store.dispatch(fetchBookings()),
                    Store.dispatch(fetchLocations()),
                    Store.dispatch(fetchVehicles()),
                    Store.dispatch(fetchMakes()),
                    Store.dispatch(fetchModels()),
                    Store.dispatch(fetchPayments()),
                    Store.dispatch(fetchBundles()),
                    Store.dispatch(fetchServices()),
                    Store.dispatch(fetchPromos())
                ])
                .then(() => {
                    this.setState({ authNeeded: false });
                })
                .catch(() => {
                    this.setState({ authNeeded: true });
                })
                .finally(() => {
                    this._loadAssetsAsync();
                });
            }
        })
        .catch(() => {
            this.setState({ authNeeded: true });
            this._loadAssetsAsync();
        });
    }

    async _loadAssetsAsync() {
        try {
            await cacheAssetsAsync({
                images: [
                    require('./assets/images/exponent-wordmark.png'),
                    require('./assets/images/mynt-header-img1.jpg')
                ],
                fonts: [
                    FontAwesome.font,
                    { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },

                ]
            });
        } catch (e) {
            console.warn('There was an error caching assets (see: main.js), perhaps due to a ' +
                'network timeout, so we skipped caching. Reload the app to try again.');
            console.log(e.message);
        } finally {
            this.setState({ appIsReady: true });
        }
    }

    render() {
        if (this.state.appIsReady) {
            const route = this.state.authNeeded === true ? 'login' : 'rootNavigation';
            return <StackNavigation id="root" navigatorUID="root" initialRoute={Router.getRoute(route)} />;
        }
        return (<Exponent.Components.AppLoading />);
    }
}

const mapStateToProps = state => {
    return {
        accessToken: state.user.accessToken,
        // navigation: state.navigation
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
