import React from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Grid, Col, Row } from 'native-base';
import _ from 'lodash';
import cs from '../../../constants/SharedStyles';
import BackButtonCustom from '../../../navigation/BackButtonCustom';
import { remove } from '../../../actions/LocationActions';
import AddButton from '../../../components/AddButton';

@connect((state) => {
  return {
    promos: _.toArray(state.promo.list),
    isLoading: state.promo.isLoading,
  }
}, { remove })
class PromoList extends React.Component {
  static route = {
    navigationBar: {
      title: 'Promo Codes',
      backgroundColor: '#fff',
      renderLeft: (route, props) => <BackButtonCustom />,
      renderRight: (route, props) => <AddButton name='promoAdd' title="Enter Promo Code" />
    },
  }

  render() {
    return (
      <View style={cs.container}>
        <ScrollView>
          <List style={[cs.bg000]}>
            {this.props.promos.map((promo, i) => {
              return (
                <ListItem key={i} style={[cs.bg000, cs.borderBWidth1, cs.border200]}>
                  <Grid style={[]}>
                    <Row>
                      <Text style={[cs.f405, cs.fw4]}>
                        {promo.display}
                      </Text>
                    </Row>
                    <Row style={[cs.mt05]}>
                      <Text style={[cs.f605, cs.fw5, cs.color500]}>
                        Expires at {promo.expires_at}
                      </Text>
                    </Row>
                  </Grid>
                </ListItem>
              );
            })}
          </List>
          <Grid style={[cs.ml2, cs.mr2, cs.mt2, cs.mb2]}>
            <Row>
              <Text style={[cs.color500, cs.f405, cs.fw4, cs.tc, cs.flx1]}>
                Promotional codes added here can be applied when booking a car wash.
              </Text>
            </Row>
          </Grid>
        </ScrollView>
        <Spinner visible={this.props.isLoading} />
      </View>
    );
  }
}

export default PromoList;
