import React, { Component } from 'react';
import { View } from 'react-native';
import { Grid, Col, Row, Text } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import s from '../styles';
import cs from '../constants/SharedStyles';

class ErrorBox extends Component {
    render() {
        const message = this.props.message;
        const noIcon = this.props.noIcon || false;
        const center = this.props.center || false;

        if (!message) {
            return <View />;
        }

        return (
            <View style={[noIcon === true ? cs.bgP3 : cs.bgErrorGray]}>
                <Grid>
                  <Row>
                    { noIcon === false &&
                      <FontAwesome name='exclamation-circle' size={20} color='#ffffff' style={[cs.errorIcon, cs.pt05, cs.pb05, cs.pl08, cs.pr08, cs.bgP2, cs.radiusBL5]} />
                    }
                    <Text style={[cs.errorText, cs.selfStart, cs.mr08, cs.pt05, cs.pb05, cs.color000, cs.fw5, cs.f6]}>{message}</Text>
                  </Row>
                </Grid>
            </View>
        );
    }
}

ErrorBox.propTypes = {
    message: React.PropTypes.string
};

export default ErrorBox;
