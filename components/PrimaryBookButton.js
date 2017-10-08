import React from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text } from 'react-native';
import { withNavigation } from '@expo/ex-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { Grid, Col, Row } from 'native-base';
import cs from '../constants/SharedStyles';

@withNavigation
export default class AddButton extends React.Component {
    goToBooking = () => {
        this.props.navigation.getNavigator('root').push('bookingForm');
    }
    render() {
        return (
            <Grid style={[cs.selfCenter]}>
                <TouchableHighlight
                  style={[cs.relative, cs.pl3, cs.pr3, cs.pt105, cs.pb105, cs.bgP4, cs.radiusRound, cs.shadow4]}
                  onPress={this.goToBooking}
                  activeOpacity={1}
                  underlayColor={'#40d47e'}
                >
                    <Text style={[cs.color000, cs.f4, cs.fw5]}>
                        {this.props.text}
                    </Text>
                </TouchableHighlight>
            </Grid>
        );
    }
}
