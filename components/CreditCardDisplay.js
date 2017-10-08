import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Grid, Col, Row } from 'native-base';
import cs from '../constants/SharedStyles';

export default class CreditCardDisplay extends React.Component {
  render() {
    if (!this.props.last4) {
      return;
    }
    return (
      <Grid style={[cs.mb2, cs.ml2, cs.mr2]}>
          <Row style={[cs.pt1, cs.flxRow]}>
              <View style={[cs.width35, cs.selfStart]}>
                  <MaterialIcons name='credit-card' size={16} style={[cs.colorP4, cs.pl08, cs.pr08]} />
              </View>
              <View style={[cs.flx1]}>
                  <Row>
                    <Text style={[cs.f5, cs.fw5, cs.color800]}>
                       **** {this.props.last4}
                    </Text>
                  </Row>
                  <Row>
                      <Text style={[cs.f6, cs.color600]}>
                          No Notes
                      </Text>
                  </Row>
              </View>
              <View style={[cs.selfCenter, cs.width35]}>
                  <MaterialIcons name='chevron-right' size={20} style={[cs.selfEnd, cs.color500]} />
              </View>
          </Row>
      </Grid>
    );
  }
}
