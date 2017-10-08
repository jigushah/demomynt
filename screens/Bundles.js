import React from 'react';
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    Image as ImageNative
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Grid, Col, Row, Radio } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';
import numeral from 'numeral';
import cs from '../constants/SharedStyles';
import AddButton from '../components/AddButton';
import { bundleChanged ,setTemp,confirmTemp,unsetTemp} from '../actions/BookingActions';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import BackButtonCustom from '../navigation/BackButtonCustom';
var lastIndex = 0;

class Bundles extends React.Component {
    static route = {
        navigationBar: {
            title: 'Bundles',
            backgroundColor: '#fff',
            renderLeft: (route, props) => <BackButtonCustom />
        },
    };
    componentWillMount = () => {
        //this.props.setTemp({key:'vehicle',value:this.props.vehicles[this.props.vehicles.length-1]});
        if(!this.props.selectedbundles) {
            this.props.setTemp({key: 'bundle', value: this.props.bundles[0]});
        }
    };

    goToVehicleList = () => {
        this.props.navigator.push('AllVehicles');
    };
    getCurrentIndex = () => {
        const tempIndex = this.refs.carousel.currentIndex;
        if (this.props.bundles){
            const bundle = this.props.bundles[tempIndex];

            this.props.setTemp({key:'bundle',value:bundle});
            this.props.update(bundle);
        }
        if (lastIndex > tempIndex){
            this.refs.view.fadeInRight(300)
        }else{
            this.refs.view.fadeInLeft(300)
        }
         lastIndex = tempIndex;
    };
    renderSelectedBundle = (Bundle) => {

        if (!this.props.selectedbundles.id) {
            return;
        }
        if (this.props.selectedbundles.id !== Bundle.id) {
            return;
        }
        return (
            <Animatable.View ref="view">
            <FontAwesome name='check-circle' size={20} style={[cs.colorP4, cs.selfEnd]} />
            </Animatable.View>
        );
    };

    renderList = () => {
        return _.map(this.props.bundles, (bundle, id) => {
            const price = numeral(bundle.sedan_price / 100).format('$0,0[.]00');
            var tempServices = [];
            if (bundle.services.length > 3){
                tempServices.push(bundle.services[0],bundle.services[1],bundle.services[2]);
            }else{
                tempServices = bundle.services;
            }

            const services = _.map(tempServices, 'name').join('\n');
            return (
                <View key={bundle.id} style={[styles.slideInnerContainer, cs.bg000, cs.radius5, cs.shadow1, cs.mb2]} >
                    <Grid style={[cs.mt3, cs.mb2, cs.ml2, cs.mr2]} >
                        <Col size={5}>
                        <Row style={[cs.mb05]}>
                            <Text style={[cs.f3, cs.fw6, cs.color700]}>
                                {bundle.name}
                            </Text>
                        </Row>
                        <Row style={[cs.mb1]}>
                            <Text style={[cs.f405, cs.fw4, cs.color500]}>
                                {bundle.description}
                            </Text>
                        </Row>

                        <Row style={[cs.pt105, cs.borderTWidth1, cs.border300]}>
                            <Text style={[cs.f5, cs.fw4, cs.color800, cs.lineh1]}>
                                {services}
                            </Text>
                        </Row>
                        {/*<Row onPress={() => this.props.update(bundle)}>*/}
                            {/*<View style={[cs.pt05, cs.pb05, cs.mr105]}>*/}
                                {/*<Text style={[cs.f6, cs.fw4, cs.colorS5]}>*/}
                                    {/*View All Services*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</Row>*/}
                            {(bundle.services.length > 3)?
                                <Row onPress={() =>
                                    this.props.navigator.push('BundleServices',{
                                        services: bundle.services
                                    })
                                }>
                                    <View style={[cs.pt05, cs.pb05, cs.mr105]}>
                                        <Text style={[cs.f6, cs.fw4, cs.colorS5]}>
                                            View All Services
                                        </Text>
                                    </View>
                                </Row>:
                                null
                            }
                        </Col>
                        <Col size={2}>
                            <Row style={[cs.mb1]}>
                                <Text style={[cs.f205, cs.fw6, cs.colorP4]}>
                                    {price}
                                </Text>
                            </Row>
                            <Row style={[cs.selfEnd]}>
                                {this.renderSelectedBundle(bundle)}
                            </Row>
                        </Col>
                    </Grid>
                </View>
            );
        });
    }

    renderServiceList = () => {
        return _.map(this.props.services, (service, id) => {
            const price = numeral(service.price / 100).format('$0,0[.]00');
            const text = `${service.name}`;
            return (
                <ListItem
                   // key={i}
                    //onPress={() => this.props.update(service)}
                    style={[cs.pt05, cs.pb05, cs.border200, cs.bg000]}>
                    <Grid>
                        <Col size={5}>
                            <Row>
                                <Text style={[cs.f5, cs.color800, cs.mb05]}>
                                    {text}
                                </Text>
                            </Row>
                        </Col>
                        <Col size={1} style={[cs.pt05, cs.pb05]}>
                            <Row>
                                <Text style={[cs.f5, cs.fw5, cs.colorP4]}>
                                    {price}
                                </Text>
                            </Row>
                        </Col>
                    </Grid>
                </ListItem>
            );
        })
    }

    renderVehicleList = () => {
        return _.map(this.props.vehicles, (vehicle, id) => {
            return (
                <ListItem key={id} style={[cs.bg000, cs.borderBWidth1, cs.border200]}
                          onPress={() => this.props.setTemp({ key: 'vehicle', value: vehicle })}>
                    <Grid style={[]}>
                        <Col size={9}>
                            <Row>
                                <Text style={[cs.f505, cs.fw5]}>
                                    {vehicle.year} {vehicle.make} {vehicle.model}
                                </Text>
                            </Row>
                            <Row style={[cs.mt05]}>
                                <Text style={[cs.f605, cs.fw5, cs.color500]}>
                                    {vehicle.color}
                                    {vehicle.license_plate ? ` | ${vehicle.license_plate}` : ''}
                                </Text>
                            </Row>
                        </Col>
                        <Col size={1} style={[cs.pt05, cs.pb05]}>
                            <Row style={[cs.jcAround, cs.selfCenter, cs.flx1, cs.flxCol]}>
                                {this.renderSelectedVehicle(vehicle)}
                            </Row>
                        </Col>
                    </Grid>
                </ListItem>
            );
        })
    };
    renderSelectedVehicle = (vehicle) => {
        if (!this.props.selectedVehicle.id) {
            return;
        }
        if (this.props.selectedVehicle.id !== vehicle.id) {
            return;
        }
        return <FontAwesome name='check-circle' size={20} style={[cs.colorP4, cs.flx1, cs.tr, cs.flxCol, cs.selfCenter]} />;
    };

    render = () => {
        var selectedBundleIndex=0
        if(this.props.selectedbundles){
            _.map(this.props.bundles, (bundle, index) => {
                if(bundle.id==this.props.selectedbundles.id)
                {
                    selectedBundleIndex=index
                }
            })
        }
        return (
            <View style={cs.container}>

                <ScrollView style={[cs.pt2, cs.pb3]}>
                    <Grid style={[cs.ml3, cs.mb1]}>
                        <Row style={[cs.jcBetween,cs.mr3]}>
                            <Col>
                            <Text style={[cs.fw5, cs.color500]}>
                                Vehicle
                            </Text>
                            </Col>
                            <Col size={1} onPress={()=>{
                                this.props.navigator.push('VehicleAdd');
                            }}>
                                <Text style={[cs.fw5, cs.colorS5, cs.u]}>
                                Add vehicle
                            </Text>
                            </Col>
                        </Row>
                    </Grid>
                    {/*<Carousel*/}
                        {/*ref={'carousel'}*/}
                        {/*sliderWidth={sliderWidth}*/}
                        {/*itemWidth={itemWidth}*/}
                        {/*inactiveSlideScale={0.94}*/}
                        {/*inactiveSlideOpacity={0.8}*/}
                        {/*style={[cs.selfCenter, styles.carousel]}*/}
                        {/*enableSnap={true}*/}
                        {/*showsHorizontalScrollIndicator={false}*/}
                    {/*>*/}
                        {/*{this.renderVehicles()}*/}
                    {/*</Carousel>*/}

                    <List style={[cs.bg000]}>
                        {this.renderVehicleList()}
                    </List>

                    <Grid style={[cs.ml3, cs.mb1, cs.mt2]}>
                        <Row>
                            <Text style={[cs.fw5, cs.color500]}>
                                Bundle
                            </Text>
                        </Row>
                    </Grid>
                    <Carousel
                        ref={'carousel'}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        inactiveSlideScale={0.94}
                        inactiveSlideOpacity={0.8}
                        style={[cs.selfCenter, styles.carousel]}
                        enableSnap={true}
                        firstItem={selectedBundleIndex}
                        showsHorizontalScrollIndicator={false}
                        onSnapToItem={() => this.getCurrentIndex()}
                    >
                        {this.renderList()}
                    </Carousel>
                    <Grid style={[cs.ml3, cs.mb1]}>
                        <Row style={[cs.jcBetween,cs.mr3]}>
                            <Col size={1}>
                            <Text style={[cs.fw5, cs.color500]}>
                                Add-on Services
                            </Text>
                            </Col>
                            <Col size={1} onPress={()=>{
                                this.props.navigator.push('services');
                            }}>
                            <Text style={[cs.fw5, cs.colorS5, cs.u]}>
                                Add/Remove
                            </Text>
                            </Col>
                        </Row>
                    </Grid>
                    <View style={[styles.slideInnerContainer, cs.selfCenter, cs.bg000, cs.radius5, cs.shadow1, cs.mb2]}>
                        <View style={[cs.mt2, cs.mb2, cs.ml2, cs.mr2]}>
                            <List style={[cs.bg000]}>
                                {this.renderServiceList()}
                            </List>
                        </View>
                    </View>
                </ScrollView>


                <View style={[cs.pl3, cs.pr3, cs.flx1,cs.pb1,cs.pt1,cs.itemsEnd, cs.flxRow, cs.jcBetween, cs.bottom1,{backgroundColor: '#f9fafa'}]}>
                    <View style={[]}>
                        <TouchableHighlight
                            style={[cs.pl3, cs.pr3, cs.pt1, cs.pb1, cs.bg000, cs.radiusRound, cs.borderP3, cs.borderWidth1]}
                            activeOpacity={1}
                            underlayColor={'#EEEEEE'}
                            onPress={() =>{
                                this.props.unsetTemp('bundle');
                                this.props.unsetTemp('vehicle');
                                this.props.navigator.pop();
                            }}>
                            <Text style={[cs.colorP3, cs.f405, cs.fw4]}>
                                Cancel
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[]}>
                        <TouchableHighlight
                            style={[cs.pl3, cs.pr3, cs.pt1, cs.pb1, cs.bgP5, cs.radiusRound, cs.borderWidth1, cs.borderP5, cs.shadow5]}

                            activeOpacity={1}
                            underlayColor={'#0378e9'}
                            onPress={() =>{
                                this.props.confirmTemp('bundle');
                                this.props.confirmTemp('vehicle');
                                this.props.navigator.pop();
                            }}
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

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(78);

export const sliderWidth = viewportWidth;

export const itemHorizontalMargin = wp(2);
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
export const carouselWidth = sliderWidth * 0.1;


// const sliderWidth = Dimensions.get('window').width * .75;
// const slideWidth = Dimensions.get('window').width * .75;
// const horizontalMargin = Dimensions.get('window').width * .10;
// const itemWidth = slideWidth + horizontalMargin * 2;

const styles = StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
    },
    carousel: {
        paddingLeft: carouselWidth,
        paddingRight: carouselWidth,
    }
});

const mapStateToProps = state => {
    return {
        bundle: state.booking.new.bundle,
        bundles: state.bundle.list,
        selectedbundles: state.booking.new.temp.bundle,
        services: state.booking.new.services,
        servicesList: state.service.list,
        vehicle: state.booking.new.vehicle,
        selectedVehicle: state.booking.new.temp.vehicle,
        vehicles: _.toArray(state.vehicle.list),
        lastVehicle: state.vehicle.lastVehicle
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update: (bundle) => dispatch(bundleChanged(bundle)),
        setTemp: (data) => dispatch(setTemp(data)),
        confirmTemp: (data) => dispatch(confirmTemp(data)),
        unsetTemp: (data) => dispatch(unsetTemp(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bundles);
