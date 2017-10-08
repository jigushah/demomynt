import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
//import Geocoder from 'react-native-geocoder';
import { FormInput, List, ListItem } from 'react-native-elements';
//import getSuggestions from '../api/smartyStreets';
import cs from '../constants/SharedStyles';

class LocationScreen extends React.Component {
    state = {
        location: 'Calc',
        addr: ''
    }

    async componentWillMount() {
        try {
            //await getSuggestions();
            // console.log('stuff', stuff);
        } catch (e) {
            console.log('e', e);
        }
        // const stuff = getSuggestions();
        // console.log('stuff', stuff);
        this.getCurrentPosition();
    }

    dismiss = () => {
        this.props.navigation.dismissModal();
    }

    getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const loc = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            this.setState({
                location: loc.lat + ' ' + loc.lng
            });
            // Geocoder.geocodePosition(loc).then(res => {
            //     console.log('res', res);
            //     // res is an Array of geocoding object (see below)
            // })
            console.log(position);
        });
    }

    render = () => {
        return (
            <View style={[cs.container]}>
                <View style={cs.contentContainer}>
                    <FormInput
                        placeholder="Add an address"
                        value={this.state.addr}
                        onChangeText={(text) => this.setState({addr: text})}
                    />
                    <List>
                        <ListItem
                            key="1"
                            title="Current Location"
                            leftIcon={{name: 'navigation'}}
                            subtitle={this.state.location}
                            hideChevron
                        />
                    </List>
                    <List>
                        <Text
                            style={[cs.ml1, cs.mt2, cs.f5, cs.fw5, cs.color700]}>
                            Vehicle(s)
                        </Text>
                        <ListItem>
                        </ListItem>
                    </List>
                    <List>
                        <Text
                            style={[cs.ml1, cs.mt2, cs.f5, cs.fw5, cs.color700]}>
                            Date/Time
                        </Text>
                        <ListItem>
                        </ListItem>
                    </List>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps, {})(LocationScreen);
