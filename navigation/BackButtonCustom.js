import React from 'react';
import { withNavigation } from '@expo/ex-navigation';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { resetBooking } from '../actions/BookingActions';

const mapStateToProps = state => { return {}; };

const mapDispatchToProps = dispatch => {
    return {
        resetBooking: () => dispatch(resetBooking())
    };
};

@withNavigation
@connect(mapStateToProps, mapDispatchToProps)
export default class BackButtonCustom extends React.Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this._onPress}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: 15,
                    paddingRight: 15
                }}
            >
                <Ionicons name='ios-arrow-back' size={25} color='#000000' />
            </TouchableOpacity>
        );
    }
    _onPress = () => {
        if (this.props.reset) {
          if (this.props.reset === 'booking') {
            this.props.resetBooking();
          }
        }
        if (this.props.onPress) {
            return this.props.onPress();
        }

        if (this.props.isModal) {
            this.props.navigation.dismissModal();
        } else {
            this.props.navigator.pop();
        }
    }
}
