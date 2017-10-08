import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Button } from 'react-native-elements';
import { Grid, Col, Row, List, ListItem, ListGroup, Input } from 'native-base';
import cs from '../constants/SharedStyles';

export default class TestScreen extends React.Component {
    dismiss = () => {
        this.props.navigation.dismissModal();
    }

    render = () => {
        return (
            <View style={[cs.container]}>
                <ScrollView>

                    <View>
                        <Grid style={[cs.mt2]}>
                            <Row>
                                <Text style={[cs.ml2, cs.mb1, cs.fw5, cs.color500]}>
                                    Primary Vehicle Info
                                </Text>
                            </Row>
                        </Grid>
                        <Grid>
                            <Row style={[cs.pl1, cs.pr1, cs.pt05, cs.pb05, cs.bg000, cs.borderWidth1, cs.border200]}>
                                <Input placeholder="Make" style={[cs.flx1]} />
                            </Row>
                            <Row style={[cs.pl1, cs.pr1, cs.pt05, cs.pb05, cs.bg000, cs.borderBWidth1, cs.border200]}>
                                <Input placeholder="Model" style={[cs.flx1]} />
                            </Row>
                            <Row style={[cs.pl1, cs.pr1, cs.pt05, cs.pb05, cs.bg000, cs.borderBWidth1, cs.border200]}>
                                <Input placeholder="Year" style={[cs.flx1]} />
                            </Row>
                            <Row style={[cs.pl1, cs.pr1, cs.pt05, cs.pb05, cs.bg000, cs.borderBWidth1, cs.border200]}>
                                <Input placeholder="Color" style={[cs.flx1]} />
                            </Row>
                            <Row style={[cs.pl1, cs.pr1, cs.pt05, cs.pb05, cs.bg000, cs.borderBWidth1, cs.border200]}>
                                <Input placeholder="License Plate # (optional)" style={[cs.flx1]} />
                            </Row>
                        </Grid>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentContainer: {
        paddingTop: 80
    },
    centered: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    }
});
