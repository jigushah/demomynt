import React from 'react';
import {
    Dimensions,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { Components } from 'expo';
import { SlidingTabNavigation, SlidingTabNavigationItem } from '@expo/ex-navigation';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Container, Content, Grid, Col, Row, List, ListItem } from 'native-base';
import { fetchBookings, viewReceipt } from '../actions/BookingActions';
import CreditCardDisplay from '../components/CreditCardDisplay';

import cs from '../constants/SharedStyles';
const mapDispatchToProps = dispatch => {
    return {
        viewReceipt,
        refresh: () => dispatch(fetchBookings(true))
    };
};
const mapStateToProps = state => {
    return {
        upcoming: state.booking.list.upcoming,
        past: state.booking.list.past,
        upcomingIsLoading: state.booking.list.upcomingIsLoading,
        pastIsLoading: state.booking.list.pastIsLoading
    };
};
@connect(mapStateToProps, mapDispatchToProps)
class HistoryScreen extends React.Component {
    static route = {
        navigationBar: {
            visible: true,
            backgroundColor: '#fff',
          height: 18,
          ...SlidingTabNavigation.navigationBarStyles,
        }
    }

    goToFirstTab = () => {
        this.props.navigation.performAction(({ tabs, stacks }) => {
            tabs('history').jumpToTab('upcoming');
        });
    };

    goToSecondTab = () => {
        this.props.navigation.performAction(({ tabs, stacks }) => {
            tabs('history').jumpToTab('past');
        });
    };

    renderLabel = ({ route }) => {
        let title;
        if (route.key === 'upcoming') {
            title = 'Upcoming';
        } else if (route.key === 'past') {
            title = 'Past';
        }
        return <Text style={styles.tabLabel}>{title}</Text>;
    }

    renderPast = (row, i) => {
        const address = `${row.address1}${(row.address2 ? `, ${row.address2},` : ',')} ${row.city}, ${row.state} ${row.zipcode}`;
        const address1 = `${row.address1}${(row.address2 ? `, ${row.address2}` : '')}`;
        return (
          <View style={cs.container}>
              <ScrollView>
                  <View style={[cs.mt1, cs.mb2, cs.pl1, cs.pr1, cs.bg000, cs.shadow1]}>
                      <Grid style={[cs.mt1, cs.mb2, cs.ml2, cs.mr2]}>
                          <Row>
                              <Components.MapView
                                  style={[ cs.flx1, cs.height100, cs.radius5 ]}
                                  showsCompass={false}
                                  ref={ref => { this.map = ref; }}
                                  initialRegion={{
                                    latitude: 27.9050697,
                                    longitude: -82.675962,
                                    latitudeDelta: 0.0622,
                                    longitudeDelta: 0.0421,
                                  }}
                              >
                              </Components.MapView>
                          </Row>
                          <View style={[cs.pt2, cs.flxRow]}>
                              <View style={[cs.width35, cs.selfStart]}>
                                  <MaterialIcons name='location-on' size={16} style={[cs.colorP3, cs.pl08, cs.pr08]} />
                              </View>
                              <View style={[cs.flx1]}>
                                  <Row style={[]}>
                                      <Text style={[cs.f5, cs.fw5, cs.color800]}>
                                        {address1}
                                      </Text>
                                  </Row>
                                  <Row>
                                      <Text style={[cs.f6, cs.fw4, cs.color600]}>
                                          {row.city}, {row.state.toUpperCase()} {row.zipcode}
                                      </Text>
                                  </Row>
                              </View>
                              <View style={[cs.selfCenter, cs.width35]}>
                                  {/*<FontAwesome name='angle-right' size={20} style={[cs.selfEnd, cs.color500]} />*/}
                                  <MaterialIcons name='chevron-right' size={20} style={[cs.selfEnd, cs.color500]} />
                              </View>
                          </View>
                      </Grid>
                      {row.vehicles.map((data, key) => {
                        return (
                          <Grid key={key} style={[cs.mb2, cs.ml2, cs.mr2]}>
                          <Row style={[cs.pt1, cs.flxRow]}>
                            <View style={[cs.width35, cs.selfStart]}>
                              <MaterialIcons name='directions-car' size={16} style={[cs.colorP5, cs.pl08, cs.pr08]} />
                            </View>
                            <View style={[cs.flx1]}>
                              <Row>
                                <Text style={[cs.f5, cs.fw5, cs.color800]}>
                                 {`${data.vehicle.year} ${data.vehicle.make} ${data.vehicle.model}`}
                                </Text>
                              </Row>
                              <Row>
                                <Text style={[cs.f6, cs.fw4, cs.color600]}>
                                  {data.bundle.name}
                                </Text>
                              </Row>
                              <Row style={[cs.pt03]}>
                                <Text style={[cs.f6, cs.fw4, cs.color600]}>
                                  {data.bundle.description}
                                </Text>
                              </Row>
                            </View>
                            <View style={[cs.selfCenter, cs.width35]}>
                              <MaterialIcons name='chevron-right' size={20} style={[cs.selfEnd, cs.color500]} />
                            </View>
                          </Row>
                          </Grid>
                        );
                      })}
                      <Grid style={[cs.mb2, cs.ml2, cs.mr2]}>
                          <Row style={[cs.pt1, cs.flxRow]}>
                              <View style={[cs.width35, cs.selfStart]}>
                                  <MaterialCommunityIcons name='calendar-clock' size={16} style={[cs.colorP6, cs.pl08, cs.pr08]} />
                              </View>
                              <View style={[cs.flx1]}>
                                  <Row>
                                      <Text style={[cs.f5, cs.fw5, cs.color800]}>
                                         {row.period.formatted}
                                      </Text>
                                  </Row>
                                  <Row style={[cs.pt03]}>
                                      <Text style={[cs.f6, cs.fw4, cs.color600]}>
                                          {row.date_day_long}, {row.date_month} {row.date_date}
                                      </Text>
                                  </Row>
                              </View>
                              <View style={[cs.selfCenter, cs.width35]}>
                                  <MaterialIcons name='chevron-right' size={20} style={[cs.selfEnd, cs.color500]} />
                              </View>
                          </Row>
                      </Grid>
                      <CreditCardDisplay last4={row.payment_last_4} />
                      <Grid style={[cs.mb2, cs.ml2, cs.mr2, cs.pb2]}>
                          <Col>
                              <Row>
                                  <Text style={[cs.f6, cs.color600]}>
                                      Notes: {row.notes || 'No Notes'}
                                  </Text>
                              </Row>
                          </Col>
                      </Grid>
                      <Grid style={[cs.mb105, cs.ml2, cs.mr2]}>
                          <Col size={9}>
                              <Row>
                                  <Text style={[cs.f4, cs.fw6, cs.color800]}>
                                      Total
                                  </Text>
                              </Row>
                          </Col>
                          <Col size={2}>
                              <Row style={[cs.selfEnd]}>
                                  <Text style={[cs.f3, cs.fw6, cs.color800]}>
                                      {numeral(row.total / 100).format('$0,0[.]00')}
                                  </Text>
                              </Row>
                          </Col>
                      </Grid>
                  </View>
              </ScrollView>
          </View>
        );
    }

    renderUpcoming = (row, i) => {
        const address = `${row.address1}${(row.address2 ? `, ${row.address2},` : ',')} ${row.city}, ${row.state} ${row.zipcode}`;
        const address1 = `${row.address1}${(row.address2 ? `, ${row.address2}` : '')}`;
        return (
          <View style={cs.container}>
              <ScrollView>
                  <View style={[cs.mt1, cs.mb2, cs.pl1, cs.pr1, cs.bg000, cs.shadow1]}>
                      <Grid style={[cs.mt1, cs.mb2, cs.ml2, cs.mr2, cs.pb2, cs.pt2, cs.border300, cs.borderBWidth1]}>
                          <Row style={[]}>
                              <Text style={[cs.f4, cs.fw5, cs.color800]}>
                                  {row.date_day_long}, {row.date_month} {row.date_date}
                              </Text>
                          </Row>
                          <Row style={[cs.mt05]}>
                              <Text style={[cs.f6, cs.fw5, cs.color800]}>
                                  {row.period.formatted}
                              </Text>
                          </Row>
                          <Row style={[]}>
                              <Text style={[cs.f6, cs.fw4, cs.color600]}>
                                  One-time
                              </Text>
                          </Row>
                      </Grid>
                      <Grid style={[cs.mb2, cs.ml2, cs.mr2, cs.pb2, cs.border300, cs.borderBWidth1]}>
                          <Components.MapView
                              style={{ height: 85, width: 110, borderRadius: 10 }}
                              showsCompass={false}
                              ref={ref => { this.map = ref; }}
                              initialRegion={{
                                latitude: 27.9050697,
                                longitude: -82.675962,
                                latitudeDelta: 0.0622,
                                longitudeDelta: 0.0421,
                              }}
                          >
                          </Components.MapView>
                          <Text style={[cs.pl2, cs.pt1, cs.f5, cs.fw4]}>
                            {address1} {'\n'}<Text style={[cs.f6, cs.fw4, cs.color600]}>{row.city}, {row.state.toUpperCase()} {row.zipcode}</Text>
                          </Text>
                      </Grid>
                      {row.vehicles.map((data, key) => {
                        return (
                          <Grid key={key} style={[cs.mb2, cs.ml2, cs.mr2]}>
                            <Row>
                              <Text style={[cs.f405]}>
                                {`${data.vehicle.year} ${data.vehicle.make} ${data.vehicle.model}`}
                              </Text>
                            </Row>
                            <Row style={[cs.pt1]}>
                              <Col size={9}>
                                <Row>
                                  <Text style={[cs.f5, cs.color700]}>
                                    {data.bundle.name}
                                  </Text>
                                </Row>
                              </Col>
                              <Col size={1}>
                                <Row style={[cs.selfEnd]}>
                                  <Text style={[cs.f5, cs.fw5, cs.color700]}>
                                    {numeral(data.bundle.sedan_price / 100).format('$0,0[.]00')}
                                  </Text>
                                </Row>
                              </Col>
                            </Row>
                            <Row style={[cs.pt05]}>
                              <Col size={10}>
                                <Row>
                                  <Text style={[cs.f6, cs.color500]}>
                                    {data.bundle.description}
                                  </Text>
                                </Row>
                              </Col>
                            </Row>
                          </Grid>
                        );
                      })}
                      <Grid style={[cs.mb2, cs.ml2, cs.mr2, cs.pb2, cs.border300, cs.borderBWidth1]}>
                          <Col>
                              <Row>
                                  <Text style={[cs.f6, cs.color600]}>
                                      Notes: {row.notes || 'No Notes'}
                                  </Text>
                              </Row>
                          </Col>
                      </Grid>
                      <Grid style={[cs.mb105, cs.ml2, cs.mr2]}>
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
                      <CreditCardDisplay last4={row.payment_last_4} />
                      <Grid style={[cs.mb2, cs.pt2, cs.ml2, cs.mr2, cs.border300, cs.borderTWidth1]}>
                          <Row style={[cs.jcEnd]}>
                              <View style={[cs.pt05, cs.pb05, cs.mr105]}>
                                  <Text style={[cs.f6, cs.fw4, cs.color600, cs.itemsEnd]}>
                                      Back to Summary
                                  </Text>
                              </View>
                              <View style={[cs.pt05, cs.pb05]}>
                                  <Text style={[cs.f6, cs.fw6, cs.colorP5, cs.itemsEnd]}>
                                      Confirm Changes
                                  </Text>
                              </View>
                          </Row>
                      </Grid>
                  </View>
              </ScrollView>
          </View>
        );
    }

    render = () => {
        return (
            <View style={[cs.container]}>
                <SlidingTabNavigation
                    id="history"
                    navigatorUID="history"
                    initialTab="upcoming"
                    renderLabel={this.renderLabel}
                    barBackgroundColor="#fff"
                    indicatorStyle={styles.tabIndicator}
                >
                    <SlidingTabNavigationItem id="past">
                        <ListView
                            data={this.props.past}
                            loading={this.props.pastIsLoading}
                            // onLoadMore={...}
                            onRefresh={this.props.refresh}
                            // renderFooter={...}
                            // renderHeader={...}
                            renderRow={this.renderPast}
                            // renderSectionHeader={...}
                            // style={...}
                        />
                    </SlidingTabNavigationItem>
                    <SlidingTabNavigationItem id="upcoming">
                        <ListView
                            data={this.props.upcoming}
                            loading={this.props.upcomingIsLoading}
                            // onLoadMore={...}
                            onRefresh={this.props.refresh}
                            // renderFooter={...}
                            // renderHeader={...}
                            renderRow={this.renderUpcoming}
                            // renderSectionHeader={...}
                            // style={...}
                        />
                    </SlidingTabNavigationItem>
                </SlidingTabNavigation>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  tabLabel: {
      margin: 8,
      fontSize: 16,
      color: '#000',
      fontWeight: '500'
  },

  tabIndicator: {
      backgroundColor: '#178CFC',
      alignSelf: 'center',
  },

  selectedTab: {
      backgroundColor: '#0084FF'
  }
});

export default HistoryScreen
