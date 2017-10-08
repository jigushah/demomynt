import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Image as ImageNative
} from 'react-native';
import { connect } from 'react-redux';
//import Geocoder from 'react-native-geocoder'
import { FormInput, List, ListItem, Grid, Col, Row } from 'react-native-elements';
import cs from '../constants/SharedStyles';

class ServicesScreen extends React.Component {
    static route = {
        navigationBar: {
            visible: true
        }
    }

    render = () => {
        return (
            <View style={[cs.container]}>
                <View style={[cs.contentHeader, cs.centered]}>
                    <Text
                        style={[cs.contentHeaderText]}
                        >
                        ASAP -> 4565 73rd Ave N.
                    </Text>
                </View>
                <View>
                    <Text style={[cs.ml1, cs.mt3, cs.mb1, cs.f3, cs.fw6]}>
                        Detail Add-ons
                    </Text>
                </View>

                <ScrollView>

                <View style={[cs.tile1]}>
                    <Grid>
                        <Row>
                            <Col>
                                <ImageNative
                                    style={[cs.tileimg1]}
                                    source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-12.png' }}
                                    onPress={this.goToServices}
                                />
                                <Text style={[cs.mt1, cs.f4, cs.fw4, cs.tl]} onPress={this.goToServices}>
                                    MyntMinimal
                                </Text>
                                <Text>
                                    $18
                                </Text>
                            </Col>
                            <Col>
                                <ImageNative
                                    style={[cs.tileimg1]}
                                    source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-12.png' }}
                                />
                                <Text style={[cs.mt1, cs.f4, cs.fw4, cs.tl]} onPress={this.goToServices}>
                                    MyntMinimal
                                </Text>
                                <Text>
                                    $18
                                </Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ImageNative
                                    style={[cs.tileimg1]}
                                    source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-12.png' }}
                                />
                                <Text style={[cs.mt1, cs.f4, cs.fw4, cs.tl]} onPress={this.goToServices}>
                                    MyntMinimal
                                </Text>
                                <Text>
                                    $18
                                </Text>
                            </Col>
                            <Col>
                                <ImageNative
                                    style={[cs.tileimg1]}
                                    source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-12.png' }}
                                />
                                <Text style={[cs.mt1, cs.f4, cs.fw4, cs.tl]} onPress={this.goToServices}>
                                    MyntMinimal
                                </Text>
                                <Text>
                                    $18
                                </Text>
                            </Col>
                        </Row>
                    </Grid>
                </View>

                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps, {})(ServicesScreen);
