import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from '@expo/ex-navigation';
import { MaterialIcons } from '@expo/vector-icons';

@withNavigation
export default class AddButton extends React.Component {
  onPress = () => {
    this.props.navigator.push(this.props.name);
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingRight: 15
        }}
      >
        <MaterialIcons name='add' size={25} color='#000000' />
      </TouchableOpacity>
    );
  }
}
