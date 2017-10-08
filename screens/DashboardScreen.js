import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'native-base';
import _ from 'lodash';
import cs from '../constants/SharedStyles';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import PrimaryBookButton from '../components/PrimaryBookButton';
import ActionSheet from 'react-native-actionsheet'

// start actionsheet
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 2;
const options = [ 'Cancel', 'Edit Booking', 'Cancel Booking' ];
const title = 'What do you want to do?';
// end actionsheet

@connect((state) => {
  return {
    firstName: state.user.firstName,
    upcoming: state.booking.list.upcoming,
    past: state.booking.list.past,
    upcomingIsLoading: state.booking.list.upcomingIsLoading,
    pastIsLoading: state.booking.list.pastIsLoading,
    count: state.booking.list.count,
    lastBookedAgo: state.booking.list.lastBookedAgo
  };
}, {})
class DashboardScreen extends React.Component {

    // start actionsheet
    constructor(props) {
      super(props);
      this.state = {
        selected: ''
      };
      this.handlePress = this.handlePress.bind(this);
      this.showActionSheet = this.showActionSheet.bind(this)
    }

    showActionSheet() {
      this.ActionSheet.show()
    }

    handlePress(i) {
      this.setState({
        selected: i
      })
    }

    // end actionsheet

    static route = {
        navigationBar: {
            visible: true,
            backgroundColor: '#fff',
            tintColor: '#222',
            renderBackground: props => (
            <View style={[cs.brandImageNavContainer]}>
              <Image
                source={require('../assets/images/brandLogoText1.png')}
                style={[cs.brandImageNav1]}
              />
            </View>
          ),
        }
    };

    goToLocation = () => {
        this.props.navigation.getNavigator('root').push('location');
    };
    goToRequestMynt = () => {
        this.props.navigation.showModal('requestMynt');
    };

    renderMessage = () => {
      // This is a first time user
      if (this.props.count === 0) {
        return  <View>
                <Grid style={[cs.ml4, cs.mr4, cs.radius5, cs.shadow1, cs.pt4, cs.pb3, cs.bg000, cs.radiusTL5, cs.radiusTR5]} >
                  <Row style={[cs.pl3, cs.pr3, cs.selfCenter, cs.mb4]}>
                    <Image
                      source={require('../assets/images/carCleanSparkle.png')}
                      style={[]}
                    />
                  </Row>
                  <Row style={[cs.pl3, cs.pr3]}>
                    <Text style={[cs.mb1, cs.f2, cs.fw4, cs.color800, cs.flx1, cs.tc]}>
                        Hello {this.props.firstName}
                    </Text>
                  </Row>
                  <Row style={[cs.pl3, cs.pr3]}>
                    <Text style={[cs.f405, cs.fw4, cs.color800, cs.flx1, cs.tc]}>Keeping your car clean has never been easier!</Text>
                  </Row>
                  <Row style={[cs.mt3, cs.centerChildren]}>
                    <PrimaryBookButton text="Book a Car Wash" />
                  </Row>
                </Grid>
                </View>;
      }
      // This user has booked with us before
      if (this.props.upcoming.length === 0) {
        return <Text style={[cs.ml4, cs.mr4, cs.mb1, cs.f4, cs.fw4, cs.color800, cs.transparentBackground]}>Your last Mynt car wash was {this.props.lastBookedAgo}</Text>;
      }
      // User has more than one upcoming bookings
      if (this.props.upcoming.length > 1) {
        return <Text style={[cs.ml4, cs.mr4, cs.mb1, cs.f4, cs.fw4, cs.color800, cs.transparentBackground]}>You have multiple upcoming bookings.</Text>;
      }
      // User has one upcoming booking
      // <Text style={[cs.ml4, cs.mr4, cs.mb1, cs.f405, cs.fw4, cs.color800, cs.transparentBackground, cs.flx1, cs.tc]}>You have an upcoming booking!</Text>;
      return <Text style={[cs.ml4, cs.mr4, cs.mb1, cs.f405, cs.fw4, cs.color800, cs.transparentBackground, cs.flx1, cs.tc]}>You have an upcoming booking!</Text>;
    };

    renderPrimaryBookingButtonCTA = () => {
      // This is a first time user
      if (this.props.count === 0) {
        return ;
      }
      // This user has booked with us before
      if (this.props.upcoming.length === 0) {
        return <Animatable.View animation="fadeInDown" style={[cs.mt3, cs.mb2]}>
                  <PrimaryBookButton text="Book a Car Wash" />
                </Animatable.View>;
      }
      // User has more than one upcoming bookings
      if (this.props.upcoming.length > 1) {
        return <Animatable.View animation="fadeInDown" style={[cs.mt3, cs.mb2]}>
                  <PrimaryBookButton text="Book Again" />
                </Animatable.View>;
      }
      // User has one upcoming booking
      return  <Animatable.View animation="fadeInDown" style={[cs.mt3, cs.mb2]}>
                <PrimaryBookButton text="Book Again" />
              </Animatable.View>;
    };

    renderCurrentStatusText = (booking) => {
      if (!_.isEmpty(booking.logs)) {
        return (
          <Row style={[cs.pt2]}>
            <Text style={[cs.f6, cs.fw4, cs.color800]}>
              Current Status
            </Text>
          </Row>
        );
      }
      return <View />;
    }

    renderUntilBookingStatus = (booking) => {
      if (booking.until_booking) {
        return (
          <Row style={[cs.pt2]}>
            <Text style={[cs.f6, cs.fw4, cs.color800]}>
              {booking.until_booking}
            </Text>
          </Row>
        );
      }
      return <View />;
    }

    renderImmediateBooking = () => {
      if (this.props.upcoming.length === 0) {
        return;
      }
      const booking = this.props.upcoming[0];
      return (
        <Animatable.View animation="fadeInDown" style={[cs.mt1]}>
            <Grid style={[cs.ml4, cs.mr4, cs.radius5, cs.shadow1, cs.pl3, cs.pr3, cs.pt4, cs.pb3, cs.bg000, cs.radiusTL5, cs.radiusTR5]} onPress={this.goToTestPage}>
            {/*<Grid style={[cs.shadow1, cs.pl4, cs.pr2, cs.pt4, cs.pb2, cs.bg000, cs.radiusTL5, cs.radiusTR5]} onPress={this.goToTestPage}>*/}
                {/*}<Row style={[cs.pb105]}>
                    <Col size={3}>
                        <Row>
                            <Text style={[cs.colorP3, cs.f6, cs.fw5]}>
                                NEXT UPCOMING BOOKING
                            </Text>
                        </Row>
                    </Col>
                    <Col style={[cs.right1]}>
                        <Row style={[cs.selfEnd]}>
                            <MaterialIcons name='edit' size={20} color='#757575' />
                        </Row>
                    </Col>
                </Row>*/}
                <Row style={[cs.pb05]}>
                    <Text style={[cs.color700, cs.f205, cs.fw5, cs.flx1, cs.tl]}>
                        {`${booking.date_day_long}, ${booking.date_month} ${booking.date_date}`}
                    </Text>
                </Row>
                <Row style={[cs.borderBWidth1, cs.border300, cs.pb2]}>
                    <Text style={[cs.color700, cs.f4, cs.fw4, cs.flx1, cs.tl]}>
                        {booking.period.formatted}
                    </Text>
                </Row>
                { this.renderCurrentStatusText(booking) }
                {_.map(booking.logs, (row, id) => {
                  return (
                    <Row key={id} style={[cs.pt2]}>
                      {id === 0 &&
                        <FontAwesome
                            name='check-circle'
                            size={16}
                            style={[cs.dashboardStatusIconWidth, cs.colorP5]}
                        />
                      }
                      <Text style={[cs.f6, cs.fw5, cs.color800]}>
                          {row.update_status_to}
                      </Text>
                      <Text style={[cs.f6, cs.fw5, cs.color800, cs.flx1, cs.tr]}>
                          {row.time}
                      </Text>
                    </Row>
                  );
                })}
                { this.renderUntilBookingStatus(booking) }
            </Grid>
        </Animatable.View>
      );
    };

    render = () => {
        return (
            <View animation="zoomInUp" style={cs.container}>
                <ScrollView>

                  <Animatable.View animation="fadeInDown" style={[cs.jcEnd, cs.mt3]}>
                      <View onPress={this.goToRequestMynt}>
                          { this.renderMessage() }
                      </View>
                  </Animatable.View>

                  { this.renderImmediateBooking() }

                  { this.renderPrimaryBookingButtonCTA() }

                  {/*}<Text onPress={this.showActionSheet}>Example A</Text>*/}
                  <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={title}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                  />

                </ScrollView>
            </View>
        );
    }
}

export default DashboardScreen;
