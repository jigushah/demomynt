import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Grid, Col, Row, Input } from 'native-base';
import numeral from 'numeral';
import cs from '../constants/SharedStyles';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const LocationModal = (row) => {
  return (
    <View style={cs.container}>
        <ScrollView>
            <View style={[cs.mt8, cs.mb1, cs.ml2, cs.mr2]}>
                <Grid>
                    <Row>
                        <Text style={[cs.f2, cs.fw5, cs.color800]}>
                            Redeem Code
                        </Text>
                    </Row>
                    <Row style={[cs.mt1]}>
                        <Text style={[cs.f4, cs.fw4, cs.color800]}>
                            Your redeemed promo codes will be available when booking.
                        </Text>
                    </Row>
                    <Row style={[cs.mt3]}>
                        <Text style={[cs.colorP3, cs.f5, cs.fw5]}>
                            ENTER PROMO CODE
                        </Text>
                    </Row>
                    <Row style={[cs.mt1, cs.shadow1, cs.radius5, cs.bg000, cs.pl3, cs.pr3, cs.pt2, cs.pb2]}>
                        <Input style={[cs.f1, cs.fw5, cs.color800, cs.pl0, cs.f1Height]} label="promoCode" placeholder="" />
                    </Row>
                    <Grid style={[cs.bgP6, cs.radius5, cs.shadow1, cs.mt2]}>
                        <Row style={[cs.pl2, cs.pr2]}>
                            <Col style={[cs.pt105, cs.pb105]}>
                                <Row style={[cs.selfCenter]}>
                                    <Text style={[cs.color000, cs.fw5, cs.f405]}>
                                        Redeem now!
                                    </Text>
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                </Grid>
            </View>
        </ScrollView>
    </View>

  )
}

export default LocationModal;
