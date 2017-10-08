import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Tile, Button } from 'react-native-elements';
//import Expo from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';
import { Grid, Col, Row, List, ListItem, Text } from 'native-base';
import cs from '../constants/SharedStyles';
import AddButton from '../components/AddButton';

import { MonoText } from '../components/StyledText';

export default class ChatScreen extends React.Component {
    static route = {
        navigationBar: {
            title: 'Messages',
            backgroundColor: '#fff',
            renderRight: (route, props) => <AddButton name='vehicleAdd' />
        },
    }

    render = () => {
        return (
            <View style={cs.container}>
                <ScrollView>
                    <List>
                        <ListItem style={[cs.ml0, cs.pl2, cs.pr2, cs.pt2, cs.pb2, cs.bg000, cs.border200]}>
                            <Grid>
                                <Row style={[cs.mb1]}>
                                    <Col size={3}>
                                        <Text style={[cs.color800, cs.f405, cs.fw5]}>
                                            Vadim Semeniuk
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={[cs.ls1, cs.f6, cs.fw4, cs.color500, cs.selfEnd]}>
                                            8:30 AM
                                        </Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={6}>
                                        <Text style={[cs.color700]}>
                                            This is a preview message. It will fill a maximum of 2 lines of text. Once that limit is reached we...
                                        </Text>
                                    </Col>
                                    <Col>
                                        <View style={[cs.pt1, cs.selfEnd, cs.chatUnreadCircle]}>
                                        </View>
                                    </Col>
                                </Row>
                            </Grid>
                        </ListItem>
                        <ListItem style={[cs.ml0, cs.pl2, cs.pr2, cs.pt2, cs.pb2, cs.bg000, cs.border200]}>
                            <Grid>
                                <Row style={[cs.mb1]}>
                                    <Col size={3}>
                                        <Text style={[cs.color800, cs.f405, cs.fw5]}>
                                            Vadim Semeniuk
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={[cs.ls1, cs.f6, cs.fw4, cs.color500, cs.selfEnd]}>
                                            Yesterday
                                        </Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={6}>
                                        <Text style={[cs.color700]}>
                                            This is a preview message. It will fill a maximum of 2 lines of text. Once that limit is reached we...
                                        </Text>
                                    </Col>
                                    <Col>
                                        <View style={[cs.pt1, cs.selfEnd, cs.chatUnreadCircle]}>
                                        </View>
                                    </Col>
                                </Row>
                            </Grid>
                        </ListItem>
                        <ListItem style={[cs.ml0, cs.pl2, cs.pr2, cs.pt2, cs.pb2, cs.bg000, cs.border200]}>
                            <Grid>
                                <Row style={[cs.mb1]}>
                                    <Col size={3}>
                                        <Text style={[cs.color800, cs.f405, cs.fw5]}>
                                            Vadim Semeniuk
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={[cs.ls1, cs.f6, cs.fw4, cs.color500, cs.selfEnd]}>
                                            4/12/17
                                        </Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={6}>
                                        <Text style={[cs.color700]}>
                                            This is a preview message. It will fill a maximum of 2 lines of text. Once that limit is reached we...
                                        </Text>
                                    </Col>
                                </Row>
                            </Grid>
                        </ListItem>
                    </List>
                </ScrollView>
                {/*<View style={[cs.flx1, cs.flxCol, cs.itemsCenter, cs.jcCenter, cs.emptyStateText]}>
                    <Text style={[cs.selfCenter, cs.f3, cs.fw5, cs.pb1]}>
                        No messages to display!
                    </Text>
                    <Text style={[cs.selfCenter, cs.tc, cs.f5, cs.fw5, cs.color500]}>
                    You will be able to see your messages here once they are initiated with a detailer you book.
                    </Text>
                </View>*/}
            </View>
        );
    }
}
