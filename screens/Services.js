import React from 'react';
import { Text, View, InteractionManager, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Container, Content, List, ListItem, Grid, Col, Row, CheckBox } from 'native-base';
import _ from 'lodash';
import numeral from 'numeral';
import cs from '../constants/SharedStyles';
import { serviceChanged , confirmTemp } from '../actions/BookingActions';
import BookingProcessButtonVehicle from '../components/BookingProcessButtonVehicle';
import BackButtonCustom from '../navigation/BackButtonCustom';

class Services extends React.Component {
    static route = {
        navigationBar: {
            title: 'Add-ons',
            backgroundColor: '#fff',
            renderLeft: (route, props) => <BackButtonCustom />
        },
    }

    constructor(props) {
        super(props);
        this.state = { isReady: false };
    }

    componentDidMount() {
        this.setState({ isReady: true });
    }

    renderRow = (service, i) => {
        const price = numeral(service.price / 100).format('$0,0[.]00');
        const text = `${service.name}`;
        let selected = false;
        if (_.find(this.props.services, { id: service.id })) {
            selected = true;
        }
        return (
            <ListItem
                key={i}
                onPress={() => this.props.update(service)}
                style={[cs.pt05, cs.pb05, cs.border200, cs.bg000]}
            >
                <Grid>
                    <Col size={9}>
                        <Row>
                            <Text style={[cs.f5, cs.color800, cs.mb05]}>
                                {text}
                            </Text>
                        </Row>
                        <Row>
                            <Text style={[cs.f5, cs.fw5, cs.colorP4]}>
                                {price}
                            </Text>
                        </Row>
                    </Col>
                    <Col size={1} style={[cs.pt05, cs.pb05]}>
                        <Row style={[cs.jcAround, cs.selfCenter, cs.flx1, cs.flxCol]}>
                            <CheckBox
                                checked={selected}
                                onPress={() => this.props.update(service)}
                            />
                        </Row>
                    </Col>
                </Grid>
            </ListItem>
        );
    }

    render = () => {
        if (!this.state.isReady) {
            return (
                <Container style={cs.container}>
                    <Content>
                        <Text>Loading</Text>
                    </Content>
                </Container>
            );
        }
        return (
            <Container style={cs.container}>

                <ScrollView>

                    <List
                        dataArray={this.props.servicesList}
                        renderRow={this.renderRow}
                        style={[cs.border200, cs.borderTWidth1, cs.mb8, cs.bg000]}
                    />

                </ScrollView>

                <View style={[cs.pl3, cs.pr3, cs.flx1,cs.pb1,cs.pt1,cs.itemsEnd, cs.flxRow, cs.jcBetween, cs.bottom1,{backgroundColor: '#f9fafa'}]}>

                </View>

            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        services: state.booking.new.services,
        servicesList: state.service.list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update: (service) => dispatch(serviceChanged(service)),
        confirmTemp: (data) => dispatch(confirmTemp(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
