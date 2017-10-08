import React from 'react';
import { Text } from 'react-native';
import { Grid, Row } from 'native-base';
import cs from '../../constants/SharedStyles';

class ListItemDisplay extends React.Component {
  render = () => {
    const vehicle = this.props.data;
    const license = vehicle.license_plate ? ` | ${vehicle.license_plate}` : '';
    return (
      <Grid style={[]}>
        <Row>
          <Text style={[cs.f405, cs.fw4]}>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </Text>
        </Row>
        <Row style={[cs.mt05]}>
          <Text style={[cs.f605, cs.fw5, cs.color500]}>
            {vehicle.color}{license}
          </Text>
        </Row>
      </Grid>
    );
  }
}

export default ListItemDisplay;
