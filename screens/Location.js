import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Components } from 'expo';
import { Container, Content, List, ListItem, Grid, Col, Row, Radio, InputGroup, Input } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import _ from 'lodash';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import numeral from 'numeral';
import AddressManager from '../api/AddressManager';
import { validateZipCode, setSelectedSavedLocation, selectLocation, setTemp, unsetTemp, confirmTemp } from '../actions/BookingActions';
import DotProgressBar from '../components/DotProgressBar';
import cs from '../constants/SharedStyles';
//import StepIndicator from 'react-native-step-indicator';
import BookingSaveButtonBottom from '../components/BookingSaveButtonBottom';
import BackButtonCustom from '../navigation/BackButtonCustom';
const Marker = loction => {
    return (
        <Components.MapView.Marker
            identifier="location"
            coordinate={{
                latitude: parseInt(loction.lat),
                longitude: parseInt(loction.long)
            }}/>
    )
}
class Location extends React.Component {
    static route = {
        navigationBar: {
            title: 'Location',
            backgroundColor: '#fff',
            // TODO: We need to remove temp location data since the user will be going backwards
            renderLeft: (route, props) => <BackButtonCustom />
        },
    }

    constructor(props) {
        super(props);
        this.state = { addressFull: 'Address' };
        this.state = {
            currentPosition: 0
        }
    }

    goToSchedule = () => {
        if (this.props.valid) {
            this.props.navigator.push('schedule');
        }
    }

    parseAddress = (details, skip = false) => {
        if (skip === false) {
            const result = AddressManager.parse(details);
            if (result && result.postal_code) {
                this.props.validate(result);
            }
        } else {
            this.props.setAddress(details);

        }
    }

    renderSelectedLocation = (location) => {
        console.log(this.props.selectedLocation.lat +"**********************"+ location.lat);
      if (!this.props.selectedLocation) {
        return;
      }
      if (this.props.selectedLocation.id !== location.id) {
        return;
      }
      return <FontAwesome name='check-circle' size={20} style={[cs.colorP4, cs.flx1, cs.tr, cs.flxCol, cs.selfCenter]} />;
    }



    render = () => {
        return (
            <View style={cs.container}>
              <ScrollView>

                <Grid style={[cs.bg000, cs.mt1, cs.mb2, cs.borderWidth1, cs.border200]}>
                  <Row style={[]}>
                    <MaterialIcons name='location-on' size={16} style={[cs.pl105, cs.pt105, cs.colorP3, cs.width45]} />
                    <GooglePlacesAutocomplete
                        placeholder='Enter your address here'
                        placeholderTextColor="#9E9E9E"
                        minLength={2} // minimum length of text to search
                        autoFocus={true}
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails
                        enablePoweredByContainer
                        renderDescription={(row) => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            let skip = false;
                            if (typeof data.user_id !== 'undefined') {
                                skip = true;
                            }
                            this.parseAddress(details, skip);
                        }}
                        getDefaultValue={() => {
                            return ''; // text input default value
                        }}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyD3QX7tsD1X5UEOgBXQJ4_uekvBQO5Bc3s',
                            language: 'en', // language of the results
                            types: 'address', // default: 'geocode'
                        }}
                        styles={{
                            textInput: {
                                marginLeft: 0,
                                paddingLeft: 0,
                            },
                            description: {
                                fontWeight: '500',
                            },
                            predefinedPlacesDescription: {
                                color: '#3498db',
                            },
                            textInputContainer: {
                                backgroundColor: '#fff',
                                borderTopWidth: 0,
                                borderBottomWidth: 0
                            },
                            listView: {
                                backgroundColor: '#fff',
                                paddingLeft: 0,
                                marginLeft: 0,
                            },
                            container: {
                                flex: 1,
                            },
                        }}
                        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='None' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{}}
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: '(cities)',
                        }}
                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        // predefinedPlaces={this.props.locations}
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 200ms.
                    />
                  </Row>
                  <Row style={[]}>
                    <View style={[cs.width45]}>
                    </View>
                    <Input
                      placeholder="Address2 / Apt #"
                      placeholderTextColor="#9E9E9E"
                      style={[cs.f505, cs.fw4, cs.mt0, cs.mb0, cs.ml0, cs.pl0]}
                    />
                  </Row>
                </Grid>


                <List style={[cs.bg000, cs.borderTWidth1, cs.border200, cs.mb2]}>
                  {_.map(this.props.locations, (row, id) => {
                    const address = `${row.address1}${(row.address2 ? `, ${row.address2}` : '')}`;
                    return (
                      <ListItem key={id} style={[cs.border200]}
                                onPress={() => {
                                    console.log("Location Changed:-----"+row)
                                    this.props.setTemp({ key: 'location', value: row })}
                                }>
                        <Grid>
                            <Row>
                              <Text style={[cs.f5, cs.fw4]}>
                                {address} {'\n'}
                                <Text style={[cs.f605, cs.fw5, cs.color500]}>
                                  {row.city}, {row.state.toUpperCase()} {row.zipcode}
                                </Text>
                              </Text>
                              {this.renderSelectedLocation(row)}
                            </Row>
                        </Grid>
                      </ListItem>
                    );
                  })}
                </List>

              </ScrollView>


                <View style={[cs.pl3, cs.pr3, cs.flx1,cs.pb1,cs.pt1,cs.itemsEnd, cs.flxRow, cs.jcBetween, cs.bottom1,{backgroundColor: '#f9fafa'}]}>
                    <View style={[]}>
                        <TouchableHighlight
                            style={[cs.pl3, cs.pr3, cs.pt1, cs.pb1, cs.bg000, cs.radiusRound, cs.borderP3, cs.borderWidth1]}
                            activeOpacity={1}
                            underlayColor={'#EEEEEE'}
                            onPress={() =>{
                                this.props.unsetTemp('location');
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
                                this.props.confirmTemp('location');
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
  let lat = state.booking.new.address.lat;
  let long = state.booking.new.address.long;
  if (lat !== '') {
    lat = numeral(lat).value();
  }
  if (long !== '') {
    long = numeral(long).value();
  }
  return {
    valid: state.booking.new.address.valid,
    lat,
    long,
    locations: state.location.list,
    selectedLocation: state.booking.new.temp.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    validate: (zipcode) => dispatch(validateZipCode(zipcode)),
    setAddress: (address) => dispatch(setSelectedSavedLocation(address)),
    selectLocation: (location) => dispatch(selectLocation(location)),
    setTemp: (data) => dispatch(setTemp(data)),
    unsetTemp: (data) => dispatch(unsetTemp(data)),
    confirmTemp: (data) => dispatch(confirmTemp(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
