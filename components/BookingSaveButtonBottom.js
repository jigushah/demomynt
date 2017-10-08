import React from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text } from 'react-native';
import { withNavigation } from '@expo/ex-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { Grid, Col, Row } from 'native-base';
import cs from '../constants/SharedStyles';

@withNavigation
export default class BookingProcessButtonLocation extends React.Component {
    goToSchedule = () => {
        if (this.props.valid) {
            this.props.navigator.pop();
        }

    }
    render() {
        return (
            <View style={[cs.flx1]}>
                <TouchableHighlight
                  style={[cs.flx1, cs.pl3, cs.pr3, cs.pt105, cs.pb105, cs.bgP5, cs.borderWidth1, cs.borderP5]}
                  onPress={this.goToSchedule}
                  activeOpacity={1}
                  underlayColor={'#0378e9'}
                >
                    <Text style={[cs.color000, cs.f405, cs.fw5, cs.tc]}>
                        Done
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
