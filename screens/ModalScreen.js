import React from 'react';
import {Animated, Platform, View} from 'react-native';
import {NavigationStyles, StackNavigation} from '@expo/ex-navigation';
import BackButton from '../navigation/BackButton';
import CloseButton from '../navigation/CloseButton';
import SaveButton from '../components/SaveButton';
import defaultRouteConfig from '../navigation/defaultRouteConfig';

export default class ModalScreen extends React.Component {
    static route = {
        styles: {
            ...NavigationStyles.SlideVertical,
            configureTransition: () => ({
                timing: Animated.spring,
                speed: 25,
                bounciness: 0,
                useNativeDriver: Platform.OS === 'android'
            }),
            gestures: null
        },
        navigationBar: {
            visible: false
        }
    };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#000',
            }}>
                <StackNavigation initialRoute={this.props.route.params.initialRoute} defaultRouteConfig={{
                    styles: (Platform.OS === 'android'
                        ? NavigationStyles.Fade
                        : NavigationStyles.SlideHorizontalIOS),
                    navigationBar: {
                        visible: true,
                        borderBottomWidth: 1,
                        borderBottomColor: '#ccc',
                        title: this.props.route.params.initialRoute.params.title ? this.props.route.params.initialRoute.params.title : '',
                        ...Platform.select({
                            ios: {
                                renderLeft: () => <CloseButton />,
                                renderRight: () => {
                                  if (!this.props.route.params.initialRoute.params.saveButton) {
                                    return;
                                  }
                                  return <SaveButton />;
                                }
                            },
                            android: {
                                renderLeft: () => <BackButton isModal style={{
                                        marginLeft: 16
                                    }} />,
                                renderRight: () => {
                                  if (!this.props.route.params.initialRoute.params.saveButton) {
                                    return;
                                  }
                                  return <SaveButton />;
                                }
                            }
                        }),
                        ...defaultRouteConfig.navigationBar
                    }
                }}/>
            </View>
        );
    }
}
