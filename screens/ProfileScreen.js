import React from 'react';
import {
  ScrollView,
  Switch,
  Text,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MaterialIcons } from '@expo/vector-icons';
import { List, ListItem, Grid, Col, Row } from 'native-base';
import Router from '../navigation/Router';
import cs from '../constants/SharedStyles';
import { signOutUser } from '../actions/UserActions';
import { phoneFormatter } from '../utilities/phoneFormatter';
// import ProfileEditButton from '../components/ProfileEditButton';

class ProfileScreen extends React.Component {
    static route = {
        navigationBar: {
          backgroundColor: '#fff',
          title: 'Profile',
          // renderRight: (route, props) => <ProfileEditButton name='profileEdit' />
        },
    }
    goToLocationModal = () => {
        this.props.navigation.getNavigator('root').push('locationModal');
    }
    goToPaymentModal = () => {
        this.props.navigation.getNavigator('root').push('paymentModal');
    }
    goToVehicles = () => {
      this.props.navigation.getNavigator('root').push(Router.getRoute('VehicleList'));
    }
    goToPromo = () => {
        this.props.navigation.getNavigator('root').push('promoList');
    }
    goToPromoFeedback = () => {
        this.props.navigation.getNavigator('root').push('promoFeedback');
    }

    editProfile = () => {
      this.props.navigation.showModal('profileEdit', { title: 'Edit Profile '})
    }

    render = () => {
        let { locations, payments, vehicles } = this.props;
        return (
            <View style={[cs.container]}>
                <ScrollView>
                    <View style={[cs.mt3]}>
                        <Grid style={[cs.mb3, cs.ml2, cs.mr2]}>
                            <Image source={require('../assets/images/profileUserImgPlaceholder.png')} style={[cs.profileUserImgPlaceholder, cs.mr105]} />
                            <Col>
                                <Row style={[cs.pb05]}>
                                    <Text style={[cs.f3, cs.fw4]} >
                                        {`${this.props.firstName} ${this.props.lastName}`}
                                    </Text>
                                </Row>
                                <Row style={[]}>
                                    <Text style={[cs.f5, cs.fw4, cs.color800]} >
                                        {this.props.email}
                                    </Text>
                                </Row>
                                <Row>
                                    <Text style={[cs.f5, cs.fw4, cs.color600]} >
                                        {phoneFormatter(this.props.phone)}
                                    </Text>
                                </Row>
                            </Col>
                        </Grid>
                    </View>
                    <Grid>
                        <Row>
                            <Text style={[cs.ml2, cs.mb1, cs.fw5, cs.color500]}>
                                Saved Booking Information
                            </Text>
                        </Row>
                    </Grid>
                    <List style={[cs.bg000, cs.borderTWidth1, cs.border200]}>
                        <ListItem
                          style={[cs.borderBWidth1, cs.border200, cs.pt105, cs.pb105]}
                          onPress={this.goToLocationModal}
                        >
                            <MaterialIcons name='location-on' size={16} style={[cs.pr05, cs.colorP3, cs.ProfileMenuIconWidth]} />
                            <Text style={[cs.color800, cs.f5, cs.fw4]}>
                                Locations
                            </Text>
                            <MaterialIcons name='chevron-right' size={20} color='#757575' style={[cs.left1]} />
                        </ListItem>
                        <ListItem
                          style={[cs.borderBWidth1, cs.border200, cs.pt105, cs.pb105]}
                          onPress={this.goToPaymentModal}
                        >
                            <MaterialIcons name='credit-card' size={16} style={[cs.pr05, cs.colorP4, cs.ProfileMenuIconWidth]} />
                            <Text style={[cs.color800, cs.f5, cs.fw4]}>
                                Payment Info
                            </Text>
                            <MaterialIcons name='chevron-right' size={20} color='#757575' style={[cs.left1]} />
                        </ListItem>
                        <ListItem
                          style={[cs.borderBWidth1, cs.border200, cs.pt105, cs.pb105]}
                          onPress={this.goToVehicles}
                        >
                            <MaterialIcons name='directions-car' size={16} style={[cs.pr05, cs.colorP5, cs.ProfileMenuIconWidth]} />
                            <Text style={[cs.color800, cs.f5, cs.fw4]}>
                                Vehicles
                            </Text>
                            <MaterialIcons name='chevron-right' size={20} color='#757575' style={[cs.left1]} />
                        </ListItem>
                        <ListItem
                          style={[cs.borderBWidth1, cs.border200, cs.pt105, cs.pb105]}
                          onPress={this.goToPromo}
                        >
                            <MaterialIcons name='card-giftcard' size={16} style={[cs.pr05, cs.colorP7, cs.ProfileMenuIconWidth]} />
                            <Text style={[cs.color800, cs.f5, cs.fw4]}>
                                Promo
                            </Text>
                            <MaterialIcons name='chevron-right' size={20} color='#757575' style={[cs.left1]} />
                        </ListItem>
                    </List>
                    <Grid style={[cs.mt2]}>
                        <Row>
                            <Text style={[cs.ml2, cs.mb1, cs.fw5, cs.color500]}>
                                Account
                            </Text>
                        </Row>
                    </Grid>
                    <List style={[cs.bg000, cs.borderTWidth1, cs.border200]}>
                        <ListItem
                          onPress={this.editProfile}
                          style={[cs.borderBWidth1, cs.border200, cs.pt105, cs.pb105]}
                        >
                            <Text style={[cs.color800, cs.f5, cs.fw4]}>
                                Edit Profile
                            </Text>
                            <MaterialIcons name='chevron-right' size={20} color='#757575' style={[cs.left1]} />
                        </ListItem>
                        <ListItem
                          style={[cs.borderBWidth1, cs.border200, cs.pt105, cs.pb105]}
                        >
                            <Text style={[cs.color800, cs.f5, cs.fw4]}>
                                Receive SMS Updates
                            </Text>
                            <Text style={[cs.left1]}>
                              <Switch
                                disabled
                                value={this.props.sendText === 1}
                              />
                            </Text>
                        </ListItem>
                        <ListItem
                          style={[cs.borderBWidth1, cs.border200, cs.pt105, cs.pb105]}
                        >
                            <Text style={[cs.color800, cs.f5, cs.fw4]}>
                                Receive Email Receipts
                            </Text>
                            <Text style={[cs.left1]}>
                              <Switch
                                disabled
                                value={this.props.sendEmail === 1}
                              />
                            </Text>
                        </ListItem>
                    </List>
                    <Grid style={[cs.mt2]}>
                        <Row>
                            <Text style={[cs.ml2, cs.mb1, cs.fw5, cs.color500]}>
                                About
                            </Text>
                        </Row>
                    </Grid>
                    <List style={[cs.bg000, cs.borderTWidth1, cs.border200]}>
                        <ListItem
                          style={[cs.borderBWidth1, cs.border200, cs.pt105, cs.pb105]}
                        >
                            <Text style={[cs.color800, cs.f5, cs.fw4]}>
                                Contact
                            </Text>
                            <MaterialIcons name='chevron-right' size={20} color='#757575' style={[cs.left1]} />
                        </ListItem>
                        <ListItem
                          style={[cs.borderBWidth1, cs.border200, cs.pt105, cs.pb105]}
                        >
                            <Text style={[cs.color800, cs.f5, cs.fw4]}>
                                Terms of Service
                            </Text>
                            <MaterialIcons name='chevron-right' size={20} color='#757575' style={[cs.left1]} />
                        </ListItem>
                        <ListItem
                          style={[cs.borderBWidth1, cs.border200, cs.pt105, cs.pb105]}
                        >
                            <Text style={[cs.color800, cs.f5, cs.fw4]}>
                                Open Source Libraries
                            </Text>
                            <MaterialIcons name='chevron-right' size={20} color='#757575' style={[cs.left1]} />
                        </ListItem>
                    </List>
                    <List style={[cs.bg000, cs.borderTWidth1, cs.border200, cs.mt2, cs.mb3]}>
                        <ListItem
                          style={[cs.borderBWidth1, cs.border200, cs.pt105, cs.pb105]}
                          onPress={() => this.props.signOut()}
                        >
                            <Text style={[cs.colorS5, cs.f5, cs.fw4]}>
                                Log Out of Mynt
                            </Text>
                        </ListItem>
                    </List>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        email: state.user.email,
        phone: state.user.phone,
        payments: state.payment.list,
        sendText: state.user.sendText,
        sendEmail: state.user.sendEmail,
        locations: _.toArray(state.location.list),
        vehicles: _.toArray(state.vehicle.list),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
