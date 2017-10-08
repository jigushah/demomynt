import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import {
    Button,
    FormLabel,
    FormInput,
} from 'react-native-elements';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Grid, Col, Row, List, ListItem, InputGroup, Input, Text } from 'native-base';

import { confirmCode } from '../actions/UserActions';
import ErrorBox from '../components/ErrorBox';
import cs from '../constants/SharedStyles';


/**
 * Forgot Password Step 1.) Confirm Code
 * Used to confirm code received by twilio
 */
@connect((state) => {
  return {
    isLoading: state.user.isLoading,
    error: state.user.error,
    resetToken: state.user.resetToken
  };
}, { confirmCode })
class ConfirmCodeScreen extends React.Component {

    state = {
      code: null
    }

    static route = {
        navigationBar: {
            visible: false
        }
    }

    goToLogin = () => {
      this.props.navigation.getNavigator('root').push('login');
    }

    confirmCode = () => {
      const router = this.props.navigation.getNavigator('root');
      this.props.confirmCode(this.state.code, router);
      // this.props.navigation.getNavigator('root').push('resetPassword');
    }

    renderError = (error) => {
  		return <ErrorBox message={error} />;
  	}

    render = () => {
        return (
            <View animation="zoomInUp" style={[cs.container, cs.bgP4]}>
                <ScrollView>
                    <View style={styles.pushPageDown}>
                    </View>
                    <View style={[cs.ml4, cs.mr4]}>
                        <Grid>
                            <Row>
                                <Text style={[cs.f2, cs.fw4, cs.color000]}>
                                    Confirm Code
                                </Text>
                            </Row>
                        </Grid>
                        <Grid style={[cs.mt05]}>
                            <Row>
                                <Text style={[cs.f3, cs.fw3, cs.color000]}>
                                    Enter the code you received below&nbsp;
                                </Text>
                            </Row>
                        </Grid>
                        <Grid style={[cs.mt3]}>
                            <Row>
                                <Text style={[cs.f5, cs.fw4, cs.color000]}>
                                    Code
                                </Text>
                            </Row>
                            <Row style={[cs.borderP2, cs.borderBWidth1]}>
                                <Input
                                    stackedLabel
                                    autoCapitalize="none"
                                    value={this.props.code}
                                    onChangeText={(code) => this.setState({code})}
                                    keyboardType="phone-pad"
                                    style={[cs.color000, cs.pl0, cs.f405]}
                                />
                            </Row>
                            {this.renderError(this.props.error)}
                        </Grid>
                        <Grid style={[cs.bg000, cs.radius5, cs.shadow1, cs.mt2]} onPress={() => this.confirmCode()}>
                            <Row style={[cs.pl2, cs.pr2]}>
                                <Col style={[cs.pt105, cs.pb105]}>
                                    <Row style={[cs.selfCenter]}>
                                        <Text style={[cs.colorP2, cs.fw5, cs.f405]}>
                                            Confirm Code
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                            <Spinner visible={this.props.isLoggingIn} />
                        </Grid>
                        <Grid style={[cs.bgP4, cs.radius5, cs.shadow1, cs.mt2]} onPress={this.goToLogin}>
                            <Row style={[cs.pl2, cs.pr2]}>
                                <Col style={[cs.pt105, cs.pb105]}>
                                    <Row style={[cs.selfCenter]}>
                                        <Text style={[cs.color000, cs.fw5, cs.f405]}>
                                            Back to Login
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
                </ScrollView>
            </View>
        );
    }
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const topHeight = viewportHeight/4;

const styles = StyleSheet.create({
    pushPageDown: {
        height: topHeight,
    }
});

export default ConfirmCodeScreen
