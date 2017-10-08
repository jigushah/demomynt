import React from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from '@expo/ex-navigation';
import { EvilIcons } from '@expo/vector-icons';
import { signOutUser } from '../actions/UserActions';
import ActionSheet from 'react-native-actionsheet';

// start actionsheet
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 2
const options = [ 'Cancel', 'Edit Profile', 'Sign Out' ]
const title = 'What do you want to do?'
// end actionsheet

@withNavigation
@connect((state) => {
  return { };
}, { signOutUser })
class ProfileEditButton extends React.Component {
    // start actionsheet
    constructor(props) {
      super(props)
      this.state = {
        selected: ''
      }
      this.handlePress = this.handlePress.bind(this)
      this.showActionSheet = this.showActionSheet.bind(this)
    }

    showActionSheet() {
      this.ActionSheet.show()
    }

    handlePress(i) {
      if (i === 1) return this.props.navigation.showModal('profileEdit', { title: 'Edit Profile' });
      if (i === 2) return this.props.signOutUser();
      return;
    }

    // end actionsheet
    render() {
        return (
            <TouchableOpacity
                onPress={this.showActionSheet}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: 15
                }}
            >
                <EvilIcons name='gear' size={25} color='#000000' />
                <ActionSheet
                  ref={o => this.ActionSheet = o}
                  title={title}
                  options={options}
                  cancelButtonIndex={CANCEL_INDEX}
                  destructiveButtonIndex={DESTRUCTIVE_INDEX}
                  onPress={this.handlePress}
                />
            </TouchableOpacity>
        );
    }
}

export default ProfileEditButton;
