import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image as ImageNative
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Grid, Col, Row } from 'native-base';
import { Button } from 'react-native-elements';
import numeral from 'numeral';
import cs from '../constants/SharedStyles';
import StepIndicator from 'react-native-step-indicator';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const Receipt = (row) => {
  const address = `${row.address1}${(row.address2 ? `, ${row.address2},` : ',')} ${row.city}, ${row.state} ${row.zipcode}`;
  return (
    <View style={cs.container}>
        <ScrollView>
            <View style={[cs.mt2, cs.mb2, cs.ml2, cs.mr2, cs.bg000, cs.radius5, cs.shadow1]}>
                <Grid style={[cs.mt2, cs.mb2, cs.ml2, cs.mr2, cs.pb2, cs.border300, cs.borderBWidth1]}>
                    <Row>
                        <Text style={[cs.f5, cs.fw4]}>
                          {address}
                        </Text>
                    </Row>
                    <Row>
                        <Text style={[cs.f6, cs.fw4, cs.color600]}>
                          {row.city} {row.state}
                        </Text>
                    </Row>
                </Grid>
                <Grid style={[cs.mb2, cs.ml2, cs.mr2, cs.pb2, cs.border300, cs.borderBWidth1]}>
                    <Col size={1}>
                        <Row>
                            <Ionicons name='ios-time-outline' size={20} color='#757575' />
                        </Row>
                    </Col>
                    <Col size={9}>
                        <Row style={[cs.jcAround, cs.flx1, cs.flxCol]}>
                            <Text style={[cs.f6]}>
                                {row.date_month} {row.date_date} @ {row.period.formatted}
                            </Text>
                        </Row>
                    </Col>
                </Grid>
                <Grid style={[cs.mb2, cs.ml2, cs.mr2, cs.pb2, cs.border300, cs.borderBWidth1]}>
                    <Row>
                        <Col>
                            <Row>
                                <Text style={[cs.f405]}>
                                  {row.appointmentVehicles.map((vehicle) => {
                                    return `${vehicle.year} ${vehicle.make} ${vehicle.model}`
                                  })}
                                </Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={[cs.pt1]}>
                        <Col size={9}>
                            <Row>
                                <Text style={[cs.f5, cs.color700]}>
                                   {row.bundle.name}
                                </Text>
                            </Row>
                        </Col>
                        <Col size={1}>
                            <Row style={[cs.selfEnd]}>
                                <Text style={[cs.f5, cs.fw5, cs.color700]}>
                                    {numeral(row.bundle.sedan_price / 100).format('$0,0[.]00')}
                                </Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={[cs.pt05]}>
                        <Col size={9}>
                            <Row>
                                <Text style={[cs.f6, cs.color500]}>
                                    {row.bundle.description}
                                </Text>
                            </Row>
                        </Col>
                        <Col size={1}>
                            <Row style={[cs.selfEnd]}>
                                <Text style={[cs.f6, cs.color500]}>
                                    {numeral(row.bundle.sedan_price / 100).format('$0,0[.]00')}
                                </Text>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
                <Grid style={[cs.mb2, cs.ml2, cs.mr2, cs.pb2, cs.border300, cs.borderBWidth1]}>
                    <Col>
                        <Row>
                            <Text style={[cs.f6, cs.color600]}>
                                {row.notes || 'No Notes'}
                            </Text>
                        </Row>
                    </Col>
                </Grid>
                <Grid style={[cs.mb2, cs.ml2, cs.mr2, cs.pb2, cs.border300, cs.borderBWidth1]}>
                    <Col size={9}>
                        <Row>
                            <Text style={[cs.f405, cs.fw6, cs.color800]}>
                                Total
                            </Text>
                        </Row>
                    </Col>
                    <Col size={2}>
                        <Row style={[cs.selfEnd]}>
                            <Text style={[cs.f405, cs.fw5, cs.color800]}>
                                {numeral(row.total / 100).format('$0,0[.]00')}
                            </Text>
                        </Row>
                    </Col>
                </Grid>
                <Grid style={[cs.mb2, cs.ml2, cs.mr2]}>
                    <Col>
                        <Row>
                            <Text style={[cs.f6, cs.fw6]}>
                                <FontAwesome name='credit-card' size={20} color='#757575' /> **** 4125
                            </Text>
                        </Row>
                    </Col>
                </Grid>
            </View>
        </ScrollView>
    </View>

  )
}

const customStyles = {
    stepIndicatorSize: 15,
    currentStepIndicatorSize: 15,
    separatorStrokeWidth: 0.5,
    currentStepStrokeWidth: 4,
    stepStrokeCurrentColor: '#3498db',
    stepStrokeWidth: 4,
    stepStrokeFinishedColor: '#3498db',
    stepStrokeUnFinishedColor: '#bdc3c7',
    separatorFinishedColor: '#3498db',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#3498db',
    stepIndicatorUnFinishedColor: '#fff',
    stepIndicatorCurrentColor: '#fff',
    stepIndicatorLabelFontSize: 1,
    currentStepIndicatorLabelFontSize: 1,
};

export default Receipt;
