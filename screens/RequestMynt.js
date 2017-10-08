import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Container, Content, Grid, Col, Row, List, ListItem } from 'native-base';
import cs from '../constants/SharedStyles';
import BackButtonCustom from '../navigation/BackButtonCustom';

const cities = [
  'Clearwater',
  'Clearwater Beach',
  'Largo',
  'Pinellas Park',
  'Saint Petersburg',
  'Safety Harbor',
  'Tampa',
];
class RequestMynt extends React.Component {
    static route = {
        navigationBar: {
            title: 'All Available Cities',
            backgroundColor: '#fff',
            renderLeft: (route, props) => <BackButtonCustom />
        },
    }
    render = () => {
        return (
            <View style={[cs.container, cs.bg000]}>
                <ScrollView>
                    <Grid>
                        <Row>
                            {/* Use the params to display the data. Keep them commented out for now or else they will generate an error
                                <Text>{this.props.route.params.address.full}</Text>
                                */}
                        </Row>
                        <List style={[cs.listCities]}>
                          {cities.map((city, i) => {
                            return (
                              <ListItem key={i} style={[cs.listItemCities]}>
                                  <Text style={[cs.listItemCitiesText]}>{city}</Text>
                              </ListItem>
                            );
                          })}
                        </List>
                    </Grid>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestMynt);
