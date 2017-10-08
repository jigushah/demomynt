import React from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text } from 'react-native';
import { withNavigation } from '@expo/ex-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { Grid, Col, Row } from 'native-base';
import cs from '../constants/SharedStyles';

@withNavigation
export default class BookingProcessButtonPayment extends React.Component {
    goToSummary = () => {
       this.props.navigator.pop();
    }
    render() {
        return (
          <View style={[cs.ml3, cs.mr3, cs.flx1, cs.flxRow, cs.jcBetween]}>
            <View style={[]}>
              <TouchableHighlight
                style={[cs.pl3, cs.pr3, cs.pt1, cs.pb1, cs.bg000, cs.radiusRound, cs.borderP3, cs.borderWidth1]}
                activeOpacity={1}
                underlayColor={'#EEEEEE'}
              >
                  <Text style={[cs.colorP3, cs.f405, cs.fw4]}>
                      Cancel
                  </Text>
              </TouchableHighlight>
            </View>
            <View style={[]}>
              <TouchableHighlight
                style={[cs.pl3, cs.pr3, cs.pt1, cs.pb1, cs.bgP5, cs.radiusRound, cs.borderWidth1, cs.borderP5, cs.shadow5]}
                onPress={this.goToSummary}
                activeOpacity={1}
                underlayColor={'#0378e9'}
              >
                  <Text style={[cs.color000, cs.f405, cs.fw4]}>
                      Next | Summary
                  </Text>
              </TouchableHighlight>
            </View>
          </View>
        );
    }
}
