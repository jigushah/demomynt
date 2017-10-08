import React from 'react';
import { withNavigation } from '@expo/ex-navigation';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

@withNavigation
export default class CloseButton extends React.Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.dismissModal()}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: 15,
                    paddingRight: 15
                }}
            >
                <MaterialIcons name='close' size={25} color='#000000' />
            </TouchableOpacity>
        );
    }
}
