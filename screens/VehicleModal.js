import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image as ImageNative
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Grid, Col, Row } from 'native-base';
import { Button } from 'react-native-elements';
import numeral from 'numeral';
import cs from '../constants/SharedStyles';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import BackButtonCustom from '../navigation/BackButtonCustom';

class VehicleModal extends React.Component {
  static route = {
      navigationBar: {
          title: 'Vehicles',
          backgroundColor: '#fff',
          renderLeft: (route, props) => <BackButtonCustom />
      },
  }

  render() {
    return (
      <View style={cs.container}>
          <ScrollView>
            <List style={[cs.bg000]}>
              <ListItem style={[cs.bg000, cs.borderBWidth1, cs.border200]}>
                <Grid style={[]}>
                    <Row>
                        <Text style={[cs.f405, cs.fw4]}>
                          YEAR MAKE MODEL
                        </Text>
                    </Row>
                    <Row style={[cs.mt05]}>
                        <Text style={[cs.f605, cs.fw5, cs.color500]}>
                          COLOR | License # (if exists)
                        </Text>
                    </Row>
                </Grid>
              </ListItem>
            </List>
          </ScrollView>
      </View>
    )
  }
}

export default VehicleModal;
