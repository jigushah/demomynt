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
import { Components } from 'expo';
import { Container, Content, List, ListItem, Grid, Col, Row, Radio } from 'native-base';
import _ from 'lodash';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import numeral from 'numeral';
import AddressManager from '../../../api/AddressManager';
import { validateZipCode, setSelectedSavedLocation } from '../../../actions/BookingActions';
import cs from '../../../constants/SharedStyles';
import AddButton from '../../../components/AddButton';

class LocationAdd extends React.Component {
    static route = {
        navigationBar: {
            title: 'Add Location',
            backgroundColor: '#fff',
            renderRight: (route, props) => <AddButton name='locationAdd' />
        },
    }

    constructor(props) {
        super(props);
        this.state = { addressFull: 'Address' };
        this.state = {
            currentPosition: 0
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.valid && prevProps.lat !== this.props.lat && prevProps.long !== this.props.long) {
            this.map.fitToSuppliedMarkers(['location'], true);
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

    renderMarker = () => {
        if (this.props.valid) {
            return (
                <Components.MapView.Marker
                    identifier="location"
                    coordinate={{
                        latitude: this.props.lat,
                        longitude: this.props.long
                    }}
                />
            );
        }
    }

    render = () => {
        return (
            <View style={cs.container}>
                <Components.MapView
                    style={{ flex: 1 }}
                    showsCompass={false}
                    ref={ref => { this.map = ref; }}
                    initialRegion={{
                      latitude: 27.9050697,
                      longitude: -82.675962,
                      latitudeDelta: 0.0622,
                      longitudeDelta: 0.0421,
                    }}
                >
                    <GooglePlacesAutocomplete
                        placeholder='Enter your address here'
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
                                marginLeft: 10,
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
                                borderBottomWidth:0
                            },
                            listView: {
                                backgroundColor: '#fff',
                                paddingLeft: 7,
                            },
                            container: {
                                flex: 0,
                            }
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
                        predefinedPlaces={this.props.locations}
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 200ms.
                    />
                    {/*}{this.renderMarker()}
                    <View style={[cs.bottom1, cs.bookingNavigationContainer]}>
                        <BookingProcessButtonLocation valid={this.props.valid} />
                        <View style={[cs.ml1, cs.mr1, cs.mb105, cs.mt105]}>
                            <StepIndicator
                                 customStyles={customStyles}
                                 currentPosition={this.state.currentPosition}
                            />
                        </View>
                    </View>*/}
                </Components.MapView>

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
        locations: _.toArray(state.location.list)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        validate: (zipcode) => dispatch(validateZipCode(zipcode)),
        setAddress: (address) => dispatch(setSelectedSavedLocation(address))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationAdd);
