import { Platform, StyleSheet } from 'react-native';

const defaultRouteConfig = {
    navigationBar: {
        backgroundColor: '#FFF',
        // translucent: Platform.OS === 'ios',
        // translucentTint: 'dark',
        // backgroundColor: Platform.OS === 'android' ? '#0a0a0a' : 'rgba(0,0,0,0.01)',
        ...Platform.select({
            ios: {
                titleStyle: {
                    color: '#000',
                    fontWeight: '500'
                },
                // borderBottomWidth: StyleSheet.hairlineWidth,
                // borderBottomColor: 'rgba(255,255,255,0.1)'
                borderBottomWidth: 1,
                borderBottomColor: '#EEEEEE'
            },
            android: {
                titleStyle: {
                    color: '#fff',
                    fontWeight: '500'
                }
            }
        })
    }
};

export default defaultRouteConfig;
