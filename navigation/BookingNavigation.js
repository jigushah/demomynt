import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigation, TabNavigation, TabNavigationItem } from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default class BookingNavigation extends React.Component {
    render() {
        return <StackNavigation id="new-booking" initialRoute="location" />;
    }

    renderIcon(name, isSelected) {
        return (
            <FontAwesome
                name={name}
                size={32}
                color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        );
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
