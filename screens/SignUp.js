import React, {Component} from 'react';
import {Field, reduxForm as form} from 'redux-form';
import {Dimensions,ScrollView,StyleSheet,View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    Button,
    FormLabel,
    FormInput,
} from 'react-native-elements';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Grid, Col, Row, List, ListItem, InputGroup, Input, Text } from 'native-base';
import cs from '../constants/SharedStyles';
import {signupUser} from '../actions/UserActions';
import ErrorBox from '../components/ErrorBox';
import {TextField} from '../components/forms/TextField';
import {phoneFormatter, phoneParser} from '../utilities/phoneFormatter';

/**
 * Signup Screen
 */
@form({
  form: 'signup',
  validate: (values) => {
    const errors = {};

    if (!values.first_name) {
      errors.first_name = 'First Name is required';
    }

    if (!values.last_name) {
      errors.last_name = 'Last Name is required';
    }

    if (!values.phone) {
      errors.phone = 'Phone is required';
    } else if (values.phone && values.phone.length < 10) {
      errors.phone = 'Phone is invalid';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  }
})
@connect((state) => {
  return {
    error: state.user.signupError,
    isLoading: state.user.isLoading
  }
}, { signupUser })
class SignUp extends Component {
    static route = {
        navigationBar: {
            visible: false
        }
    }

    signupUser = (formProps) => {
      this.props.signupUser(formProps);
    }

    renderError = (error) => {
      if (!error) return <View />;
  		return <ErrorBox message={error.message} />;
  	}

    goToLogin = () => {
      this.props.navigation.getNavigator('root').push('login');
    }

    render = () => {
        const {handleSubmit} = this.props;

        return (
            <View animation="zoomInUp" style={[cs.container, cs.bg000]}>
                <KeyboardAwareScrollView style={{paddingTop:75}}>
                    <View style={[cs.pl4, cs.pr4, cs.mb4]}>
                        <Grid>
                            <Row>
                                <Text style={[cs.f2, cs.fw4, cs.color800]}>
                                    Sign Up
                                </Text>
                            </Row>
                        </Grid>
                        <Grid style={[cs.mt3]}>
                            <Row>
                                <Text style={[cs.f5, cs.fw4, cs.color800]}>
                                    First Name
                                </Text>
                            </Row>
                            <Row>
                                <Field
                                  autoCapitalize="words"
                                  type="text"
                                  component={TextField}
                                  name="first_name" />
                            </Row>
                            <Row style={[cs.mt2]}>
                                <Text style={[cs.f5, cs.fw4, cs.color800]}>
                                    Last Name
                                </Text>
                            </Row>
                            <Row>
                                <Field
                                  autoCapitalize="words"
                                  component={TextField}
                                  name="last_name" />
                            </Row>
                            <Row style={[cs.mt2]}>
                                <Text style={[cs.f5, cs.fw4, cs.color800]}>
                                    Email
                                </Text>
                            </Row>
                            <Row>
                                <Field
                                  autoCapitalize="none"
                                  keyboardType="email-address"
                                  component={TextField}
                                  name="email" />
                            </Row>
                            <Row style={[cs.mt2]}>
                                <Text style={[cs.f5, cs.fw4, cs.color800]}>
                                    Phone
                                </Text>
                            </Row>
                            <Row>
                                <Field
                                  component={TextField}
                                  placeholder={"NNN-NNN-NNNN"}
                                  format={phoneFormatter}
                                  parse={phoneParser}
                                  name="phone"
                                  keyboardType="phone-pad"
                                  autoCapitalize="none" />
                            </Row>
                            <Row style={[cs.mt2]}>
                                <Text style={[cs.f5, cs.fw4, cs.color800]}>
                                    Password
                                </Text>
                            </Row>
                            <Row>
                                <Field
                                  secureTextEntry={true}
                                  component={TextField}
                                  name="password"
                                  autoCapitalize="none" />
                            </Row>
                            {this.renderError(this.props.error)}
                        </Grid>
                        <Grid style={[cs.bgP4, cs.radiusRound, cs.shadow5, cs.mt2]} onPress={handleSubmit(this.signupUser.bind(this))}>
                            <Row style={[cs.pl2, cs.pr2]}>
                                <Col style={[cs.pt105, cs.pb105]}>
                                    <Row style={[cs.selfCenter]}>
                                        <Text style={[cs.color000, cs.fw5, cs.f405]}>
                                            Get Started
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                            <Spinner visible={this.props.isLoading} />
                        </Grid>
                        <Grid>
                            <Row style={[cs.mt2, cs.ml4, cs.mr4]}>
                                <Text style={[cs.f6, cs.fw5, cs.color800, cs.tc]}>
                                    By clicking "Get Started" I agree to the terms of service
                                </Text>
                            </Row>
                        </Grid>
                        <Grid style={[cs.bg100, cs.radiusRound, cs.shadow3, cs.mt2]} onPress={this.goToLogin}>
                            <Row style={[cs.pl2, cs.pr2]}>
                                <Col style={[cs.pt105, cs.pb105]}>
                                    <Row style={[cs.selfCenter]}>
                                        <Text style={[cs.color800, cs.fw5, cs.f405]}>
                                            Have an account? Sign in here!
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

export default SignUp
