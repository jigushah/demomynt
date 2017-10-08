import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';
import { List, ListItem } from 'native-base';
import Swipeout from 'rc-swipeout';
import cs from '../../../constants/SharedStyles';
import BackButtonCustom from '../../../navigation/BackButtonCustom';
import AddButton from '../../../components/AddButton';
import ListItemDisplay from '../../../components/vehicles/ListItemDisplay';
import { remove } from '../../../actions/VehicleActions';

const mapStateToProps = state => {
  return {
    vehicles: state.vehicle.list,
    isLoading: state.vehicle.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    remove: (data) => dispatch(remove(data))
  };
};

@connect(() => mapStateToProps, mapDispatchToProps)
class VehicleList extends React.Component {
  static route = {
    navigationBar: {
      title: 'Vehicles',
      backgroundColor: '#fff',
      renderLeft: (route, props) => <BackButtonCustom />,
      renderRight: (route, props) => <AddButton name='VehicleAdd' />
    },
  }

  render() {
    return (
      <View style={cs.container}>
        <ScrollView>
          <List style={[cs.bg000]}>
            {_.map(this.props.vehicles, (vehicle, id) => {
              return (
                <Swipeout
                  key={vehicle.id}
                  style={[cs.bg000]}
                  right={[
                    {
                      text: 'DELETE',
                      onPress: () => this.props.remove(vehicle),
                      style: { backgroundColor: 'red', color: 'white' }
                    }
                  ]}
                >
                  <ListItem key={id} style={[cs.bg000, cs.borderBWidth1, cs.border200]}>
                    <ListItemDisplay data={vehicle} />
                  </ListItem>
                </Swipeout>
              );
            })}
          </List>
        </ScrollView>
        <Spinner visible={this.props.isLoading} />
      </View>
    );
  }
}

export default VehicleList;
