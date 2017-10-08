import Expo from 'expo';
import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, View,AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationProvider } from '@expo/ex-navigation';
import Store from './reducers';
import Storage from 'react-native-storage';
import navigationContext from './navigation/CustomNavigationContext';
import App from './App';

const storage = new Storage({ size: 1000, storageBackend: AsyncStorage, defaultExpires: null, enableCache: true, sync: {} });
global.storage = storage;

class AppContainer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Provider store={Store}>
              <NavigationProvider context={navigationContext}>
                  <App {...this.props} />
              </NavigationProvider>
          </Provider>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff'
  },
});

Expo.registerRootComponent(AppContainer);
