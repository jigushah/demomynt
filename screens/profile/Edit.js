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
import cs from '../../constants/SharedStyles';
import ErrorBox from '../../components/ErrorBox';
import { update } from '../../actions/UserActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { phoneFormatter, phoneParser } from '../../utilities/phoneFormatter';

@form({
  form: 'profileEdit',
  validate: (values) => {
    const errors = {};

    return errors;
  }
})
@connect((state) => {
  return {
    // initialValues: state.user, This wont work because of http://redux-form.com/6.0.0-alpha.4/docs/faq/ReactNative.md/
    isLoading: state.user.isLoading,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    phone: state.user.phone
  };
}, { update })
class ProfileEdit extends React.Component {

    updateProfile = (formProps) => {
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
                          <ErrorBox message={this.props.error} />
                        </Grid>
                        <Grid style={[cs.mt2]}>
                            <Row>
                                <Text style={[cs.ml2, cs.mb1, cs.fw5, cs.color500]}>
                                    Edit Profile Information
                                </Text>
                            </Row>
                        </Grid>
                        <View>
                          <Field
                            name="first_name"
                            type="text"
                            component={renderField}
                            label={this.props.firstName || 'First Name'}
                            component={renderField} />

                          <Field
                            name="last_name"
                            type="text"
                            component={renderField}
                            label={this.props.lastName || 'Last Name'} />

                          <Field
                            component={renderField}
                            placeholder={"NNN-NNN-NNNN"}
                            format={phoneFormatter}
                            parse={phoneParser}
                            name="phone"
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            label={this.props.phone || 'Phone Number'} />

                          <Field
                            autoCapitalize="none"
                            keyboardType="email-address"
                            component={renderField}
                            name="email"
                            label={this.props.email || 'Email'} />

                          <Field
                            name="phoneNumber"
                            type="text"
                            component={renderField} />

                          <Field
                            name="email"
                            type="text"
                            value={this.props.email}
                            component={renderField} />

                          </View>
                          <Grid onPress={handleSubmit(this.updateProfile.bind(this))} style={[cs.mt2, cs.mb2, cs.ml4, cs.mr4, cs.bgP6, cs.radius5, cs.shadow1]}>
                              <Row style={[cs.pl2, cs.pr2]}>
                                  <Col style={[cs.pt105, cs.pb105]}>
                                      <Row style={[cs.selfCenter]}>
                                          <Text style={[cs.color000, cs.f4, cs.fw5]}>
                                              Save
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
        value={input.value}
        onChangeText={input.onChange}
        style={[cs.flx1, cs.fi5, cs.color800]} />
      {renderMessage()}
    </Row>
  )
};

export default ProfileEdit
