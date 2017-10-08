import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image as ImageNative
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Grid, Col, Row } from 'native-base';
import _ from 'lodash';
import cs from '../constants/SharedStyles';
import BackButtonCustom from '../navigation/BackButtonCustom';
import Swipeout from 'rc-swipeout';
import { remove } from '../actions/LocationActions';
import AddButton from '../components/AddButton';


@connect((state) => {
  return {
    locations: _.toArray(state.location.list),
    isLoading: state.location.isLoading,
  }
}, { remove })
class LocationModal extends React.Component {
  static route = {
      navigationBar: {
          title: 'Location(s)',
          backgroundColor: '#fff',
          renderLeft: (route, props) => <BackButtonCustom />,
          renderRight: (route, props) => <AddButton name='locationAdd' />
      },
  }

  render() {
    return (
      <View style={cs.container}>
          <ScrollView>
              {this.props.locations.map(location => {
                return (
                  <List>
                    <Swipeout
                      key={location.id}
                      style={[cs.bg000]}
                      right={[
                        {
                          // text: <MaterialIcons name='delete' size={25} color='#FFF' />,
                          text: <Text style={[cs.f5, cs.fw5]}>DELETE</Text>,
                          onPress: () => this.props.remove(location),
                          style: { backgroundColor: 'red', color: 'white' }
                        }
                      ]}>
                      <ListItem style={[cs.bg000, cs.borderBWidth1, cs.border200]}>
                          <Grid style={[]}>
                              <Row>
                                  <Text style={[cs.f405, cs.fw4]}>
                                    {location.address1}
                                  </Text>
                              </Row>
                              <Row style={[cs.mt05]}>
                                  <Text style={[cs.f605, cs.fw5, cs.color500]}>
                                    {location.city}, {location.state} {location.zipcode}
                                  </Text>
                              </Row>
                          </Grid>
                      </ListItem>
                    </Swipeout>
                  </List>
                )
              })}
          </ScrollView>
          <Spinner visible={this.props.isLoading} />
      </View>
    )
  }
}

export default LocationModal;
