import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Image,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    Button,
    FormLabel,
    FormInput,
} from 'react-native-elements';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Grid, Col, Row, List, ListItem, InputGroup, Input, Text } from 'native-base';

import {
	emailChanged,
	passwordChanged,
	loginUser
} from '../actions/UserActions';
import ErrorBox from '../components/ErrorBox';
import cs from '../constants/SharedStyles';

class LoginScreen extends React.Component {
    static route = {
        navigationBar: {
            visible: false
        }
    }

    login = () => {
      this.props.loginUser(this.props.email, this.props.password);
    }

    goToSignup = () => {
      this.props.navigation.getNavigator('root').push('signup');
    }

    goToForgotPassword = () => {
      this.props.navigation.getNavigator('root').push('sendCode');
    }

    renderError = (error) => {
		return <ErrorBox message={error} />;
	}

    render = () => {
        return (
            <View animation="zoomInUp" style={[cs.container, cs.bg000]}>
                <KeyboardAwareScrollView>
                    <View style={styles.pushPageDown}>
                    </View>
                    <View style={[cs.ml4, cs.mr4]}>
                        <Grid>
                            <Row>
                                <Image
                                    source={require('../assets/images/brandLogoText1.png')}
                                    style={[cs.brandImageNav]}
                                />
                            </Row>
                        </Grid>
                        <Grid style={[cs.mt5]}>
                            <Row>
                                <Text style={[cs.f2, cs.fw3, cs.color800]}>
                                    Car Wash App
                                </Text>
                            </Row>
                        </Grid>
                        <Grid style={[cs.mt05]}>
                            <Row>
                                <Text style={[cs.f3, cs.fw3, cs.color800]}>
                                    Sign into your profile below
                                </Text>
                            </Row>
                        </Grid>
                        <Grid style={[cs.mt3]}>
                            <Row>
                                <Text style={[cs.f5, cs.fw4, cs.color800]}>
                                    Email
                                </Text>
                            </Row>
                            <Row style={[cs.border300, cs.borderBWidth1]}>
                                <Input
                                    stackedLabel
                                    autoCapitalize="none"
                        						autoCorrect={false}
                        						keyboardType="email-address"
                                    value={this.props.email}
                                    onChangeText={(text) => this.props.emailChanged(text)}
                                    style={[cs.color800, cs.pl0, cs.f405]}
                                />
                            </Row>
                            <Row style={[cs.mt1]}>
                                <Text style={[cs.f5, cs.fw4, cs.color800]}>
                                    Password
                                </Text>
                            </Row>
                            <Row style={[cs.border300, cs.borderBWidth1]}>
                                <Input
                                    stackedLabel
                                    autoCapitalize="none"
                        						autoCorrect={false}
                        						secureTextEntry
                                    value={this.props.password}
                                    onChangeText={(text) => this.props.passwordChanged(text)}
                                    style={[cs.color800, cs.pl0, cs.f405]}
                                />
                            </Row>
                            {this.renderError(this.props.error)}
                        </Grid>
                        <Grid style={[cs.bgP4, cs.radiusRound, cs.shadow5, cs.mt2]} onPress={() => this.login()}>
                            <Row style={[cs.pl2, cs.pr2]}>
                                <Col style={[cs.pt105, cs.pb105]}>
                                    <Row style={[cs.selfCenter]}>
                                        <Text style={[cs.color000, cs.fw5, cs.f405]}>
                                            Login
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                            <Spinner visible={this.props.isLoading} />
                        </Grid>
                        <Grid onPress={this.goToForgotPassword}>
                            <Row style={[cs.mt2, cs.selfCenter]}>
                                <Text style={[cs.f505, cs.fw5, cs.color700]}>
                                    Can't sign in? Reset your password here
                                </Text>
                            </Row>
                        </Grid>
                        <Grid style={[cs.bg100, cs.radiusRound, cs.shadow3, cs.mt2]} onPress={this.goToSignup}>
                            <Row style={[cs.pl2, cs.pr2]}>
                                <Col style={[cs.pt105, cs.pb105]}>
                                    <Row style={[cs.selfCenter]}>
                                        <Text style={[cs.color800, cs.fw5, cs.f405]}>
                                            No account? Sign up here!
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Grid>
                        {/*}<View>
                        <FormLabel>Email</FormLabel>
                        <FormInput
                            autoCapitalize="none"
    						autoCorrect={false}
    						keyboardType="email-address"
                            value={this.props.email}
                            onChangeText={(text) => this.props.emailChanged(text)}
                        />
                        <FormLabel style={[cs.color000]}>Password</FormLabel>
                        <FormInput
                            autoCapitalize="none"
    						autoCorrect={false}
    						secureTextEntry
                            value={this.props.password}
                            onChangeText={(text) => this.props.passwordChanged(text)}
                        />
    					<Button
    						title="Login"
    						backgroundColor="#0EA7F7"
    						borderRadius={20}
                            onPress={() => this.login()}
    					/>
                        <Spinner visible={this.props.isLoggingIn} />
                        </View>*/}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const topHeight = viewportHeight/8;

const styles = StyleSheet.create({
    pushPageDown: {
        height: topHeight,
    }
});

const mapStateToProps = state => {
    return {
      email: state.user.email,
  		password: state.user.password,
  		error: state.user.loginError,
  		isLoading: state.user.isLoading
    };
};

export default connect(mapStateToProps, {
	emailChanged,
	passwordChanged,
	loginUser
})(LoginScreen);
