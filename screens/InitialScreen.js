import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    View,
    Input,
    Image
} from 'react-native';
import {
    Button,
    FormLabel,
    FormInput,
} from 'react-native-elements';
import { Grid, Col, Row, Card, CardItem, Text } from 'native-base';
import { connect } from 'react-redux';
//import Spinner from 'react-native-loading-spinner-overlay';

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

    goToLogin = () => {
        this.props.navigation.getNavigator('root').push('login');
    }
    goToSignup = () => {
        this.props.navigation.getNavigator('root').push('signup');
    }

    login = () => {
        this.props.loginUser(this.props.email, this.props.password);
    }

    renderError = (error) => {
		return <ErrorBox message={error} />;
	}

    render = () => {
        return (
            <View style={[cs.container, cs.bg000]}>
                <ScrollView>
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
                    </View>
                    <View style={[cs.pl4, cs.pr4, cs.mb4]}>
                        <Grid style={[cs.bgP4, cs.radiusRound, cs.shadow5, cs.mt2]} onPress={this.goToLogin}>
                            <Row style={[cs.pl2, cs.pr2]}>
                                <Col style={[cs.pt105, cs.pb105]}>
                                    <Row style={[cs.selfCenter]}>
                                        <Text style={[cs.color000, cs.fw5, cs.f405]}>
                                            Login
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Grid>
                        <Grid style={[cs.bg100, cs.radiusRound, cs.shadow3, cs.mt2]} onPress={this.goToSignup}>
                            <Row style={[cs.pl2, cs.pr2]}>
                                <Col style={[cs.pt105, cs.pb105]}>
                                    <Row style={[cs.selfCenter]}>
                                        <Text style={[cs.color800, cs.fw5, cs.f405]}>
                                            Sign Up
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const topHeight = viewportHeight/8;
const screenImgWidth = viewportWidth-80;
const screenImgHeight = screenImgWidth/1.2894; // calculated by 998/774 | img Dimensions 998*774

const styles = StyleSheet.create({
    pushPageDown: {
        height: topHeight,
    },
    screenImgWidth: {
        width: screenImgWidth,
    },
    screenImgHeight: {
        height: screenImgHeight,
    }
});

const mapStateToProps = state => {
    console.log('state', state.user);
    return {
        email: state.user.email,
		password: state.user.password,
		error: state.user.error,
		isLoggingIn: state.user.isLoggingIn
    };
};

export default connect(mapStateToProps, {
	emailChanged,
	passwordChanged,
	loginUser
})(LoginScreen);
