import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Picker
} from 'react-native';
import {Field, reduxForm as form} from 'redux-form';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Grid, Col, Row, List, ListItem, ListGroup, Input } from 'native-base';
import cs from '../../../constants/SharedStyles';
import { update } from '../../../actions/PaymentActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

@form({
  form: 'paymentEdit',
  validate: (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Cardholder Name is required';
    }

    if (!values.card_number) {
      errors.card_number = 'Card Number is required';
    }

    if (!values.exp_month) {
      errors.exp_month = 'Expiration Month is required';
    }

    if (!values.exp_year) {
      errors.exp_year = 'Expiration Year is required';
    }

    if (!values.cvc) {
      errors.cvc = 'CVC is required';
    }

    return errors;
  }
})
@connect((state) => {
  return {
    isLoading: state.payment.isLoading
  }
}, { update })
class PaymentEdit extends React.Component {

    updatePayment = (formProps) => {
      const router = this.props.navigation.getNavigator('root');
      this.props.update(formProps, router);
      this.props.reset();
    }

    render = () => {
        const {handleSubmit} = this.props;

        return (
            <View style={[cs.container]}>
                <KeyboardAwareScrollView>
                    <View>
                        <Grid style={[cs.mt2]}>
                            <Row>
                                <Text style={[cs.ml2, cs.mb1, cs.fw5, cs.color500]}>
                                    Edit Card Information
                                </Text>
                            </Row>
                        </Grid>
                        <View>
                          <Field
                            name="name"
                            type="text"
                            component={renderField}
                            label="Cardholder Name" />

                          <Field
                            name="card_number"
                            type="text"
                            component={renderField}
                            label="Card Number #" />

                          <Field
                            name="exp_month"
                            type="text"
                            component={renderField}
                            label="Exp Month" />

                          <Field
                            name="exp_year"
                            type="text"
                            component={renderField}
                            label="Exp Year" />

                          <Field
                            name="cvc"
                            type="text"
                            component={renderField}
                            label="CVC" />

                          </View>
                          <Grid style={[cs.mt2, cs.mb2, cs.ml4, cs.mr4, cs.bgP6, cs.radius5, cs.shadow1]} onPress={handleSubmit(this.props.update.bind(this))}>
                              <Row style={[cs.pl2, cs.pr2]}>
                                  <Col style={[cs.pt105, cs.pb105]}>
                                      <Row style={[cs.selfCenter]}>
                                          <Text style={[cs.color000, cs.f4, cs.fw5]}>
                                              Update Card
                                          </Text>
                                      </Row>
                                  </Col>
                              </Row>
                              <Spinner visible={this.props.isLoading} />
                          </Grid>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const renderField = ({input, label, type, meta: {touched, error, warning}}) => {
  const renderMessage = () => {
    return (touched && error) ? <Text style={[cs.colorP3]}>{error}</Text> : null;
  }

  return (
    <Row style={[cs.pl1, cs.pr1, cs.pt05, cs.pb05, cs.bg000, cs.borderBWidth1, cs.border200]}>
      <Input
        {...input}
        placeholder={label}
        style={[cs.flx1, cs.fi5, cs.color800]} />
      {renderMessage()}
    </Row>
  )
};

export default PaymentEdit
