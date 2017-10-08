import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Components } from 'expo';
import { Container, Content, Grid, Col, Row } from 'native-base';
import { Button } from 'react-native-elements';
import numeral from 'numeral';
import cs from '../constants/SharedStyles';
import StepIndicator from 'react-native-step-indicator';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import BookingProcessButtonSummary from '../components/BookingProcessButtonSummary';
import BackButtonCustom from '../navigation/BackButtonCustom';
import CreditCardDisplay from '../components/CreditCardDisplay';

class Summary extends React.Component {
    static route = {
        navigationBar: {
            title: 'Summary',
            backgroundColor: '#fff',
            renderLeft: (route, props) => <BackButtonCustom />
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 4
        }
    }

    render = () => {
        return (
            <View style={cs.container}>

                <ScrollView>

                    <View style={[cs.mt2, cs.mb2, cs.ml2, cs.mr2, cs.bg000, cs.radius5, cs.shadow1]}>
                        <Grid style={[cs.mt2, cs.mb2, cs.ml2, cs.mr2, cs.pb2, cs.border300, cs.borderBWidth1]}>
                            <Row>
                                <Text style={[cs.f5, cs.fw4]}>
                                    {this.props.address.address1 + (this.props.address2 ? this.props.address2 : '')}
                                </Text>
                            </Row>
                            <Row>
                                <Text style={[cs.f6, cs.fw4, cs.color600]}>
                                    {this.props.address.city}, {this.props.address.state} {this.props.address.zipcode}
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
                                        {this.props.date} @ {this.props.time}
                                    </Text>
                                </Row>
                            </Col>
                        </Grid>
                        <Grid style={[cs.mb2, cs.ml2, cs.mr2, cs.pb2, cs.border300, cs.borderBWidth1]}>
                            <Row>
                                <Col>
                                    <Row>
                                        <Text style={[cs.f405]}>
                                            {this.props.vehicle.year} {this.props.vehicle.make} {this.props.vehicle.model}
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={[cs.pt1]}>
                                <Col size={9}>
                                    <Row>
                                        <Text style={[cs.f5, cs.color700]}>
                                            {this.props.bundle.name} Bundle
                                        </Text>
                                    </Row>
                                </Col>
                                <Col size={1}>
                                    <Row style={[cs.selfEnd]}>
                                        <Text style={[cs.f5, cs.fw5, cs.color700]}>
                                            {numeral(this.props.bundle.sedan_price / 100).format('$0,0[.]00')}
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={[cs.pt05]}>
                                <Col size={9}>
                                    <Row>
                                        <Text style={[cs.f6, cs.color500]}>
                                            Trim Shine (service)
                                        </Text>
                                    </Row>
                                </Col>
                                <Col size={1}>
                                    <Row style={[cs.selfEnd]}>
                                        <Text style={[cs.f6, cs.color500]}>
                                            $18
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Grid>
                        <Grid style={[cs.mb2, cs.ml2, cs.mr2, cs.pb2, cs.border300, cs.borderBWidth1]}>
                            <Col>
                                <Row>
                                    <Text style={[cs.f6, cs.color600]}>
                                        Notes display here if there are any
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
                            <Col size={1}>
                                <Row style={[cs.selfEnd]}>
                                    <Text style={[cs.f405, cs.fw6, cs.color800]}>
                                        $18
                                    </Text>
                                </Row>
                            </Col>
                        </Grid>
                        <Grid style={[cs.mb2, cs.ml2, cs.mr2]}>
                            <Col>
                                <Row>
                                    <Text style={[cs.f6, cs.fw6]}>
                                        <FontAwesome name='credit-card' size={20} color='#757575' /> **** {this.props.payment.last4}
                                    </Text>
                                </Row>
                            </Col>
                        </Grid>
                    </View>
                </ScrollView>

                <View style={[cs.bottom1]}>
                    <View>
                        <BookingProcessButtonSummary />
                    </View>
                    <View style={[cs.ml2, cs.mr2, cs.mb105, cs.mt105]}>
                        <StepIndicator
                             customStyles={customStyles}
                             currentPosition={this.state.currentPosition}
                        />
                    </View>
                </View>

            </View>
        );
    }
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

const mapStateToProps = state => {
    return {
        address: state.booking.new.address,
        date: state.booking.new.date,
        time: state.booking.new.time,
        vehicle: state.booking.new.vehicle,
        bundle: state.booking.new.bundle,
        services: state.booking.new.services,
        payment: state.booking.new.payment,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
