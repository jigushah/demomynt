import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Grid, Col, Row, CheckBox, Radio } from 'native-base';
import _ from 'lodash';
import { paymentChanged,  setTemp, unsetTemp, confirmTemp} from '../actions/BookingActions';
import cs from '../constants/SharedStyles';
//import StepIndicator from 'react-native-step-indicator';
import BookingProcessButtonPayment from '../components/BookingProcessButtonPayment';
import BackButtonCustom from '../navigation/BackButtonCustom';
import AddButton from '../components/AddButton';
var addLast = true;
class Location extends React.Component {
    static route = {
        navigationBar: {
            title: 'Payment',
            backgroundColor: '#fff',
            renderLeft: (route, props) => <BackButtonCustom />,
            renderRight: (route, props) => <AddButton name='addPayment' title="Add Vehicle" NavSaveButtonText/>
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 3
        }
    }
    goToSummary = () => {
        this.props.confirmTemp('payment');
        this.props.navigator.pop();
    };
    renderList = () => {


        return _.map(this.props.payments, (payment, id) => {
            return (
                <ListItem
                    key={id}
                    onPress={() => this.props.update(payment)}
                    style={[cs.ml0, cs.pl2, cs.pt05, cs.pb05, cs.border200, cs.bg000]}>
                    <Grid>
                        <Col size={9} style={[cs.pt05, cs.pb05]}>
                            <Row>
                                <Text style={[cs.f5]}>
                                    ***{`${payment.last4} ${payment.exp_month}/${payment.exp_year}`}
                                </Text>
                            </Row>
                            <Row>
                                <Text style={[cs.f6, cs.color600]}>
                                    {`${payment.brand}`}
                                </Text>
                            </Row>
                            <Row>
                                <Text style={[cs.f6, cs.color600]}>
                                    {`${payment.name}`}
                                </Text>
                            </Row>
                        </Col>
                        <Col size={1}>
                            <Row style={[cs.jcAround, cs.selfCenter, cs.flx1, cs.flxCol]}>
                                <Radio
                                    selected={(this.props.payment.id === payment.id)}
                                    onPress={() => {
                                        this.props.update(payment);
                                    }}/>
                            </Row>
                        </Col>
                    </Grid>
                </ListItem>
            );
        });
    };

    render = () => {
        // if (this.props.lastPayment.id && addLast){
        //     debugger;
        //     this.props.update(this.props.lastPayment);
        //     addLast=false
        // }

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
                    <List style={[cs.border200, cs.borderTWidth1,cs.mb8]}>
                        {this.renderList()}
                    </List>
                </ScrollView>

                <View style={[cs.pl3, cs.pr3, cs.flx1,cs.pb1,cs.pt1,cs.itemsEnd, cs.flxRow, cs.jcBetween, cs.bottom1,{backgroundColor: '#f9fafa'}]}>
                        <View style={[]}>
                            <TouchableHighlight
                                style={[cs.pl3, cs.pr3, cs.pt1, cs.pb1, cs.bg000, cs.radiusRound, cs.borderP3, cs.borderWidth1]}
                                activeOpacity={1}
                                underlayColor={'#EEEEEE'}
                                onPress={() => {this.props.navigator.pop()}}
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
                                    Confirm
                                </Text>
                            </TouchableHighlight>
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
        payments: state.payment.list,
        lastPayment: state.payment.lastPayment
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update: (payment) => dispatch(paymentChanged(payment)),
        setTemp: (data) => dispatch(setTemp(data)),
        unsetTemp: (data) => dispatch(unsetTemp(data)),
        confirmTemp: (data) => dispatch(confirmTemp(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
