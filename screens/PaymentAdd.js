import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image as ImageNative
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Container, Content, List, ListItem, Grid, Col, Row, CheckBox, Radio } from 'native-base';
import _ from 'lodash';
import { paymentChanged } from '../actions/BookingActions';
import cs from '../constants/SharedStyles';
//import StepIndicator from 'react-native-step-indicator';

class Location extends React.Component {
    static route = {
        navigationBar: {
            title: 'Payment',
            backgroundColor: '#fff',
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 3
        }
    }

    goToSummary = () => {
       this.props.navigator.push('summary');
    }

    renderList = () => {
        return _.map(this.props.payments, (payment, id) => {
            return (
                <ListItem
                    key={id}
                    onPress={() => this.props.update(payment)}
                    style={[cs.ml0, cs.pl2, cs.pt05, cs.pb05, cs.border200, cs.bg000]}
                >
                    <Grid>
                        <Col size={1}>
                            <Row style={[cs.jcAround, cs.selfCenter, cs.flx1, cs.flxCol]}>
                                <Radio
                                    selected={(this.props.payment.id === payment.id)}
                                    onPress={() => this.props.update(payment)}
                                />
                            </Row>
                        </Col>
                        <Col size={9} style={[cs.pt05, cs.pb05]}>
                            <Row>
                                <Text style={[cs.f6, cs.color600]}>
                                    {payment.name}
                                </Text>
                            </Row>
                            <Row>
                                <Text style={[cs.f5]}>
                                    ***{payment.last4} {payment.exp_month}/{payment.exp_year}
                                </Text>
                            </Row>
                            <Row>
                                <Text style={[cs.f6, cs.color600]}>
                                    {payment.brand}
                                </Text>
                            </Row>
                        </Col>
                    </Grid>
                </ListItem>
            );
        });
    }

    render = () => {
        return (
            <View style={cs.container}>

                <ScrollView>

                    <Grid style={[cs.mt2]}>
                        <Row>
                            <Text style={[cs.ml2, cs.mb1, cs.fw5, cs.color500]}>
                                Saved Cards
                            </Text>
                        </Row>
                    </Grid>

                    <List style={[cs.border200, cs.borderTWidth1]}>
                        {this.renderList()}
                    </List>

                </ScrollView>

                <View style={[cs.bottom1]}>
                    <View>
                        <Grid style={[cs.ml4, cs.mr4, cs.bgP6, cs.radius5, cs.shadow1]} onPress={this.goToSummary}>
                            <Row style={[cs.pl2, cs.pr2]}>
                                <Col style={[cs.pt105, cs.pb105]}>
                                    <Row style={[cs.selfCenter]}>
                                        <Text style={[cs.color000, cs.f4, cs.fw5]}>
                                            Next | Summary
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Grid>
                        {/*}<Button
                            title='View Summary'
                            backgroundColor='#000'
                            onPress={this.goToSummary}
                        />*/}
                    </View>
                    <View style={[cs.ml2, cs.mr2, cs.mb105, cs.mt105]}>

                    </View>
                </View>

            </View>
        );
    }
}

const customStyles = {
    stepIndicatorSize: 15,
    currentStepIndicatorSize:15,
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
        payment: state.booking.new.payment,
        payments: state.payment.list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update: (payment) => dispatch(paymentChanged(payment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
