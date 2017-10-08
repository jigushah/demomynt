import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Content, List, ListItem, Grid, Col, Row } from 'native-base';
import Swipeout from 'rc-swipeout';
import cs from '../constants/SharedStyles';
import AddButton from '../components/AddButton';
import ErrorBox from '../components/ErrorBox';
import { remove, add } from '../actions/PaymentActions';
import BackButtonCustom from '../navigation/BackButtonCustom';

@connect((state) => {
  return {
    payments: state.payment.list,
    isLoading: state.payment.isLoading,
    error: state.payment.error,
  };
}, { remove, add })
class LocationModal extends React.Component {
  static route = {
      navigationBar: {
          title: 'Payment Info',
          backgroundColor: '#fff',
          renderLeft: (route, props) => <BackButtonCustom />,
          renderRight: (route, props) => <AddButton name='addPayment' />
      },
  }

  removePayment = (formProps) => {
    const router = this.props.navigation.getNavigator('root');
    this.props.remove(formProps, router);
  }

  render() {
    return (
      <View style={cs.container}>
          <ErrorBox message={this.props.error} />
          <ScrollView>
            <List>
              {this.props.payments.map((payment, id) => {
                return (
                  <Swipeout
                    key={payment.id}
                    style={[cs.bg000]}
                    // left={[
                    //   {
                    //     // text: <MaterialIcons name='edit' size={25} color='#FFF' />,
                    //     text: <Text style={[cs.f5, cs.fw5]}>EDIT</Text>,
                    //     onPress: () => this.props.navigation.showModal('paymentEdit', payment),
                    //     style: { backgroundColor: 'orange', color: 'white' }
                    //   }
                    // ]}
                    right={[
                      {
                        // text: <MaterialIcons name='delete' size={25} color='#FFF' />,
                        text: <Text style={[cs.f5, cs.fw5]}>DELETE</Text>,
                        onPress: () => this.props.remove(payment),
                        style: { backgroundColor: 'red', color: 'white' }
                      }
                    ]}>
                    <ListItem id={id} style={[cs.bg000, cs.borderBWidth1, cs.border200]}>
                        <Grid style={[]}>
                            {/* TODO: Need to show the correct icon */}
                            <Image source={require('../assets/images/AmericanExpress-dark.png')} style={[cs.paymentCardIcon, cs.mr1]} />
                            <Col>
                                <Row>
                                  <Text style={[cs.f405, cs.fw4]}>
                                    {payment.brand.toUpperCase()} *{payment.last4}
                                  </Text>
                                </Row>
                                <Row>
                                  <Text style={[cs.f605, cs.fw5, cs.color500]}>
                                    {payment.name}
                                  </Text>
                                </Row>
                            </Col>
                        </Grid>
                    </ListItem>
                  </Swipeout>
                )
              })}
            </List>
          </ScrollView>
          <Spinner visible={this.props.isLoading} />
      </View>

    )
  }
}

export default LocationModal;
