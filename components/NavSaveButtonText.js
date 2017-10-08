import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from '@expo/ex-navigation';
import { MaterialIcons } from '@expo/vector-icons';

@withNavigation
export default class NavSaveButtonText extends React.Component {
    render() {
        return (
            <TouchableOpacity
              // TODO This needs to save to an action then close the modal if successful
                onPress={() => console.log('pressed')}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: 15
                }}
            >
                <MaterialIcons name='done' size={25} color='#000000' />
            </TouchableOpacity>
        );
    }
}
