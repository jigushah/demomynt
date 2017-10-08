import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Notifications } from 'expo';
import { StackNavigation, TabNavigation, TabNavigationItem } from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import cs from '../constants/SharedStyles';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

class RootNavigation extends React.Component {
    componentDidMount() {
        this._notificationSubscription = this._registerForPushNotifications();
    }

    componentWillUnmount() {
        this._notificationSubscription && this._notificationSubscription.remove();
    }

    render() {
        return (
            <TabNavigation id="app" navigatorUID="app" tabBarHeight={46} initialTab="dashboard">
                <TabNavigationItem id="dashboard" renderIcon={isSelected => this._renderIcon('home', isSelected)}>
                    <StackNavigation initialRoute="dashboard" />
                </TabNavigationItem>

                <TabNavigationItem id="history" renderIcon={isSelected => this._renderIcon('history', isSelected)}>
                    <StackNavigation initialRoute="history" />
                </TabNavigationItem>

                {/* <TabNavigationItem id="book-now" renderIcon={isSelected => this._renderIcon('circle-o', isSelected, 'circle-o-notch', 40, 40)}>
                    <StackNavigation initialRoute="location" />
                </TabNavigationItem> */}

                {/* <TabNavigationItem id="chat" renderIcon={isSelected => this._renderIcon('wechat', isSelected)}>
                    <StackNavigation initialRoute="chat" />
                </TabNavigationItem> */}

                <TabNavigationItem id="profile" renderIcon={isSelected => this._renderIcon('user', isSelected)}>
                    <StackNavigation id="profile" initialRoute="profile" />
                </TabNavigationItem>
            </TabNavigation>
        );
    }

    _renderIcon(name, isSelected, selectedName, size = 25, selectedSize = 25) {
        if (!selectedName) {
            selectedName = name;
        }
        return (
            <FontAwesome
                name={isSelected ? selectedName : name}
                size={isSelected ? selectedSize : size}
                color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        );
    }

    _registerForPushNotifications() {
        // Send our push token over to our backend so we can receive notifications
        // You can comment the following line out if you want to stop receiving
        // a notification every time you open the app. Check out the source
        // for this function in api/registerForPushNotificationsAsync.js
        registerForPushNotificationsAsync(this.props.accessToken);

        // Watch for incoming notifications
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = (notification) => {
        // this.props.navigator.showLocalAlert(`Push notification ${notification.origin} with data: ${JSON.stringify(notification.data)}`, Alerts.notice);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    selectedTab: {
        color: Colors.tabIconSelected
    }
});

const mapStateToProps = state => {
    return {
        accessToken: state.user.accessToken
    };
};

export default connect(mapStateToProps, {})(RootNavigation);
