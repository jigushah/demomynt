import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Picker
} from 'react-native';
import {Field, reduxForm as form} from 'redux-form';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Grid, Col, Row, List, ListItem, ListGroup, Input } from 'native-base';
import cs from '../../../constants/SharedStyles';
import { add } from '../../../actions/PaymentActions';
import BackButtonCustom from '../../../navigation/BackButtonCustom';
import ErrorBox from '../../../components/ErrorBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';


@form({
  form: 'paymentAdd',
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
  },

    onSubmit: (values, dispatch) => {
        // TODO: this needs to be able to handle multiple dispatch events instead of
        // just one
        return dispatch(add(values,true));
    }
})
@connect((state) => {
  return {
    isLoading: state.payment.isLoading,
    error: state.payment.error,
  }
}, { add })
class PaymentAdd extends React.Component {

    _subscriptionSave: EventSubscription;

    componentWillMount() {
        this._subscriptionSave = this.props.route.getEventEmitter().addListener('save', this._handleSave);
    }

    _handleSave = () => {
        const { handleSubmit } = this.props;
        handleSubmit();
    }

//handleSubmit(this.addPayment.bind(this))
    componentWillUnmount() {
        this._subscriptionSave.remove();
    }

    addPayment = (formProps) => {
      const router = this.props.navigation.getNavigator('root');
      this.props.add(formProps, router);
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
                            <ErrorBox message={this.props.error} />
                          </Row>
                        </Grid>
                        <Grid style={[cs.mt2]}>
                            <Row>
                                <Text style={[cs.ml2, cs.mb1, cs.fw5, cs.color500]}>
                                    Card Information
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

                              <Spinner visible={this.props.isLoading} />

                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}
PaymentAdd.route = {
    navigationBar: {
        title: 'Add Payment',
        backgroundColor: '#fff',
        renderLeft: (route, props) => <BackButtonCustom />,
        renderRight: (state: ExNavigationState) => {
            const { config: { eventEmitter }  } = state;
            return (
                <TouchableOpacity
                    onPress={() => eventEmitter.emit('save')}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingRight: 15
                    }}
                >
                    <MaterialIcons name='done' size={25} color='#000000' />
                </TouchableOpacity>
            );
        }
    }
};
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

export default PaymentAdd
