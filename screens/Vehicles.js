import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Grid, Col, Row, Radio } from 'native-base';
import _ from 'lodash';
import { withNavigation } from '@expo/ex-navigation';
import numeral from 'numeral';
import cs from '../constants/SharedStyles';
import AddButton from '../components/AddButton';
import { vehicleChanged } from '../actions/BookingActions';
import StepIndicator from 'react-native-step-indicator';
import BackButtonCustom from '../navigation/BackButtonCustom';

@withNavigation
class Location extends React.Component {
    static route = {
        navigationBar: {
            title: 'Vehicle(s)',
            backgroundColor: '#fff',
            renderLeft: (route, props) => <BackButtonCustom />,
            //renderRight: (route, props) => <AddButton name='vehicleAdd' title="Add Vehicle" NavSaveButtonText />
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 2
        }
    }

    goToBundles = () => {
       this.props.navigator.push('bundles');
    }

    renderList = () => {
        return _.map(this.props.vehicles, (vehicle, id) => {
            const text = `${vehicle.color} ${vehicle.year} ${vehicle.model} ${vehicle.make} ${vehicle.license_plate}`;
            return (
                <ListItem
                    key={id}
                    onPress={() => this.props.update(vehicle)}
                    style={[cs.ml0, cs.pl2, cs.pt05, cs.pb05, cs.border200, cs.bg000]}
                >
                    <Grid>
                        <Col size={9}>
                            <Row>
                                <Text style={[cs.f5]}>
                                    {vehicle.year} {vehicle.make} {vehicle.model}
                                </Text>
                            </Row>
                            <Row>
                                <Text style={[cs.f6, cs.color600]}>
                                    {vehicle.color} {vehicle.license_plate}
                                </Text>
                            </Row>
                        </Col>
                        <Col size={1} style={[cs.pt05, cs.pb05]}>
                            <Row style={[cs.jcAround, cs.selfCenter, cs.flx1, cs.flxCol]}>
                                <Radio
                                    selected={(this.props.vehicle.id === vehicle.id)}
                                    onPress={() => this.props.update(vehicle)}
                                />
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
                                Saved Vehicles
                            </Text>
                        </Row>
                    </Grid>

                    <List
                        style={[cs.border200, cs.borderTWidth1, cs.mb8]}
                    >
                        {this.renderList()}
                    </List>

                </ScrollView>

                <View style={[cs.bottom1]}>

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
        vehicle: state.booking.new.vehicle,
        bundle: state.booking.new.bundle,
        services: state.booking.new.services,
        vehicles: _.toArray(state.vehicle.list)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update: (vehicle) => dispatch(vehicleChanged(vehicle))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
