import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Picker
} from 'react-native';
import { Field, reduxForm as form } from 'redux-form';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Grid, Col, Row, List, ListItem, ListGroup, Input } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import cs from '../../../constants/SharedStyles';
import { addPromo } from '../../../actions/PromoActions';
import ErrorBox from '../../../components/ErrorBox';

@form({
  form: 'promoAdd',
  validate: (values) => {
    const errors = {};

    if (!values.code) {
      errors.code = 'Code is required';
    }

    return errors;
  }
})
@connect((state) => {
  return {
    isLoading: state.promo.isLoading,
    error: state.promo.error
  };
}, { addPromo })
class PromoAdd extends React.Component {
  add = (formProps) => {
    const router = this.props.navigation.getNavigator('root');
    this.props.addPromo(formProps, router);
    this.props.reset();
  }

  render = () => {
    const { handleSubmit } = this.props;

    return (
      <View style={[cs.container]}>
        <KeyboardAwareScrollView>
          <ErrorBox message={this.props.error} noIcon center />
          <View>
            <Grid style={[cs.mt2]}>
              <Row>
                <Text style={[cs.ml2, cs.mb1, cs.fw5, cs.color500]}>
                  Promo Code
                </Text>
              </Row>
            </Grid>
            <View>
              <Field
                name="code"
                type="text"
                component={renderField}
                label="Code"
              />
            </View>
            <Grid style={[cs.mt2, cs.mb2, cs.ml4, cs.mr4, cs.bgP6, cs.radius5, cs.shadow1]} onPress={handleSubmit(this.add.bind(this))}>
              <Row style={[cs.pl2, cs.pr2]}>
                <Col style={[cs.pt105, cs.pb105]}>
                  <Row style={[cs.selfCenter]}>
                    <Text style={[cs.color000, cs.f4, cs.fw5]}>
                      Add Promo Code
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

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  const renderMessage = () => {
    return (touched && error) ? <Text style={[cs.colorP3]}>{error}</Text> : null;
  };

  return (
    <Row style={[cs.pl1, cs.pr1, cs.pt05, cs.pb05, cs.bg000, cs.borderBWidth1, cs.border200]}>
      <Input
        {...input}
        placeholder={label}
        style={[cs.flx1, cs.fi5, cs.color800]}
        autoCapitalize='characters'
      />
      {renderMessage()}
    </Row>
  );
};

export default PromoAdd;
