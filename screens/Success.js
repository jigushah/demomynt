import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Grid, Col, Row } from 'native-base';
import { Button } from 'react-native-elements';
import cs from '../constants/SharedStyles';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

class Location extends React.Component {
    static route = {
        navigationBar: {
            visible: false,
            title: 'Success',
            backgroundColor: '#fff',
        },
    }

    goToDashboard = () => {
       this.props.navigation.getNavigator('root').push('rootNavigation');
    }

    render = () => {
        return (
            <View style={[cs.container, cs.bg000]}>
                <ScrollView>
                    <View style={styles.pushPageDown}>
                    </View>
                    <View>
                      <Grid style={[cs.ml4, cs.mr4, cs.mb1]}>
                        <Row style={[cs.selfCenter]}>
                          <Text style={[cs.f1, cs.fw4, cs.color800]}>
                            Success!
                          </Text>
                        </Row>
                      </Grid>
                      <Grid style={[cs.ml4, cs.mr4, cs.mb4]}>
                        <Row style={[cs.selfCenter]}>
                          <Text style={[cs.f405, cs.color700]}>
                            Your booking is complete
                          </Text>
                        </Row>
                      </Grid>
                      <Grid style={[cs.ml4, cs.mr4, cs.mb5]}>
                        <Row style={[cs.selfCenter]}>
                          <MaterialCommunityIcons name='check-circle' size={140} color='#2ecc71' />
                        </Row>
                      </Grid>
                      <Grid style={[cs.ml4, cs.mr4, cs.bg100, cs.radius5, cs.shadow1]} onPress={this.goToDashboard}>
                          <Row style={[cs.pl2, cs.pr2]}>
                              <Col style={[cs.pt105, cs.pb105]}>
                                  <Row style={[cs.selfCenter]}>
                                      <Text style={[cs.color800, cs.f4, cs.fw5]}>
                                          Go to Overview
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
const topHeight = viewportHeight/4;

const styles = StyleSheet.create({
    pushPageDown: {
        height: topHeight,
    }
});

const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps, {})(Location);
