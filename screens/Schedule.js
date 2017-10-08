import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image as ImageNative,
    TouchableHighlight,
    Picker
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Container, Content, List, ListItem, Grid, Col, Row, Radio } from 'native-base';
import _ from 'lodash';
import cs from '../constants/SharedStyles';
import StepIndicator from 'react-native-step-indicator';
import BookingProcessButtonSchedule from '../components/BookingProcessButtonSchedule';
import Spinner from 'react-native-loading-spinner-overlay';
import BackButtonCustom from '../navigation/BackButtonCustom';
var isDisplayed = true;
import { dateChanged, timeChanged, repeatEveryChanged, setInitialDateAndTime, fetchDates,setDatenTime, fetchTimes,setTemp, unsetTemp, confirmTemp } from '../actions/BookingActions';
class Schedule extends React.Component {
    static route = {
        navigationBar: {
            title: 'Schedule',
            backgroundColor: '#fff',
            renderLeft: (route, props) => <BackButtonCustom />
        },
    };

    componentWillMount = () => {
       // if (this.props.date === '') {
            this.props.fetchDates();
       // }
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 1,
        }
    }

    renderDatePicker = () => {
        const Item = Picker.Item;

        if (this.props.datesList.length>0 && isDisplayed){
            this.props.fetchTimes(this.props.datesList[0]);
            isDisplayed = false;
        }
        const dateList = _.map(this.props.datesList, (slot, id) => {
            return (
                <Item key={id} label={slot} value={slot} />
            );
        });
        return (
            <Picker
                itemStyle={{fontSize: 16, textAlign: 'center', backgroundColor: '#fff'}}
                selectedValue={this.props.date}
                onValueChange={(value) => {
                    this.props.updateDate(value);
                    this.props.fetchTimes(value);
                }}>
                {dateList}
            </Picker>
        );
    }

    renderTimePicker = () => {
        const Item = Picker.Item;
        //const times = this.props.dateAndTimes[this.props.date];
        var list = this.props.timeList;
        //var list = this.props.services;
        var serviceView =Object.keys(list).map(function (key,index) {
            let t = list[key].formatted_start_time + " - "+ list[key].formatted_end_time;
            return (
                <Item key={index} label={t} value={key} />
            )});

        const timeList = _.map(this.props.timeList, (time, id) => {
           // if (id !== 'label') {
                let t = time.formatted_start_time + " - "+ time.formatted_end_time;
              //  t = t[1].replace(')', '');
                return <Item key={id} label={t} value={time} />;
            //}
        });
        return (
            <Picker
                itemStyle={{fontSize: 16, textAlign: 'center', backgroundColor: '#fff'}}
                selectedValue={this.props.time}
                onValueChange={(value) =>{
                    this.props.updateTime(value)
                }}
            >
                {serviceView}
            </Picker>
        );
    }

    displayDateAndTime = () => {
        if (this.props.date) {
            const date = this.props.dateAndTimes[this.props.date].label;
            const time = this.props.dateAndTimes[this.props.date][this.props.time];
            let t = time.split('(');
            t = t[1].replace(')', '');
            return `${date} at ${t}`;
        }
    }

    render = () => {
        return (
            <View style={cs.container}>

                <ScrollView>

                    <Grid style={[cs.mt2]}>
                        <Row>
                            <Text style={[cs.ml2, cs.mb1, cs.fw5, cs.color500]}>
                                Date & Time Slot
                            </Text>
                        </Row>
                        <Row style={[cs.borderTWidth1, cs.borderBWidth1, cs.border200]}>
          							<Col>
          								{this.renderDatePicker()}
          							</Col>
          							<Col>
          								{this.renderTimePicker()}
          							</Col>
          						</Row>
                    </Grid>

                    {/*<Text style={[cs.mt2, cs.ml2]}>{this.displayDateAndTime()}</Text>*/}

                    <Grid>
                        <Row>
                            <Text style={[cs.ml2, cs.mt1, cs.mb1, cs.fw5, cs.color500]}>
                                Repeat Every
                            </Text>
                        </Row>
                    </Grid>

                    <List
                        style={[cs.border200, cs.borderTWidth1, cs.mb3]}
                    >
                        <ListItem
                            style={[cs.ml0, cs.pl2, cs.pt05, cs.pb05, cs.border200, cs.bg000]}
                            onPress={() => this.props.updateRepeat(0)}
                        >
                            <Grid>
                                <Col size={9}>
                                    <Row style={[cs.jcAround, cs.selfLeft, cs.flx1, cs.flxCol]}>
                                        <Text style={[cs.f5]}>No Repeat</Text>
                                    </Row>
                                </Col>
                                <Col size={1}>
                                    <Row style={[cs.jcAround, cs.selfCenter, cs.flx1, cs.flxCol]}>
                                        <Radio selected={this.props.repeatEvery === 0} onPress={() => this.props.updateRepeat(0)} />
                                    </Row>
                                </Col>
                            </Grid>
                        </ListItem>
                        <ListItem
                            style={[cs.ml0, cs.pl2, cs.pt05, cs.pb05, cs.border200, cs.bg000]}
                            onPress={() => this.props.updateRepeat(1)}
                        >
                            <Grid>
                                <Col size={9}>
                                    <Row style={[cs.jcAround, cs.selfLeft, cs.flx1, cs.flxCol]}>
                                        <Text style={[cs.f5]}>Weekly</Text>
                                    </Row>
                                </Col>
                                <Col size={1}>
                                    <Row style={[cs.jcAround, cs.selfCenter, cs.flx1, cs.flxCol]}>
                                        <Radio selected={this.props.repeatEvery === 1} onPress={() => this.props.updateRepeat(1)} />
                                    </Row>
                                </Col>
                            </Grid>
                        </ListItem>
                        <ListItem
                            style={[cs.ml0, cs.pl2, cs.pt05, cs.pb05, cs.border200, cs.bg000]}
                            onPress={() => this.props.updateRepeat(2)}
                        >
                            <Grid>
                                <Col size={9}>
                                    <Row style={[cs.jcAround, cs.selfLeft, cs.flx1, cs.flxCol]}>
                                        <Text style={[cs.f5]}>Bi-Weekly</Text>
                                    </Row>
                                </Col>
                                <Col size={1}>
                                    <Row style={[cs.jcAround, cs.selfCenter, cs.flx1, cs.flxCol]}>
                                        <Radio selected={this.props.repeatEvery === 2} onPress={() => this.props.updateRepeat(2)} />
                                    </Row>
                                </Col>
                            </Grid>
                        </ListItem>
                        <ListItem
                            style={[cs.ml0, cs.pl2, cs.pt05, cs.pb05, cs.border200, cs.bg000]}
                            onPress={() => this.props.updateRepeat(3)}
                        >
                            <Grid>
                                <Col size={9}>
                                    <Row style={[cs.jcAround, cs.selfLeft, cs.flx1, cs.flxCol]}>
                                        <Text style={[cs.f5]}>Every 3 Weeks</Text>
                                    </Row>
                                </Col>
                                <Col size={1}>
                                    <Row style={[cs.jcAround, cs.selfCenter, cs.flx1, cs.flxCol]}>
                                        <Radio selected={this.props.repeatEvery === 3} onPress={() => this.props.updateRepeat(3)} />
                                    </Row>
                                </Col>
                            </Grid>
                        </ListItem>
                        <ListItem
                            style={[cs.ml0, cs.pl2, cs.pt05, cs.pb05, cs.border200, cs.bg000]}
                            onPress={() => this.props.updateRepeat(4)}
                        >
                            <Grid>
                                <Col size={9}>
                                    <Row style={[cs.jcAround, cs.selfLeft, cs.flx1, cs.flxCol]}>
                                        <Text style={[cs.f5]}>Monthly</Text>
                                    </Row>
                                </Col>
                                <Col size={1}>
                                    <Row style={[cs.jcAround, cs.selfCenter, cs.flx1, cs.flxCol]}>
                                        <Radio selected={this.props.repeatEvery === 4} onPress={() => this.props.updateRepeat(4)} />
                                    </Row>
                                </Col>
                            </Grid>
                        </ListItem>
                    </List>

                </ScrollView>

                <View style={[cs.pl3, cs.pr3, cs.flx1,cs.pb1,cs.pt1,cs.itemsEnd, cs.flxRow, cs.jcBetween, cs.bottom1,{backgroundColor: '#f9fafa'}]}>
                    <View style={[]}>
                        <TouchableHighlight
                            style={[cs.pl3, cs.pr3, cs.pt1, cs.pb1, cs.bg000, cs.radiusRound, cs.borderP3, cs.borderWidth1]}
                            activeOpacity={1}
                            underlayColor={'#EEEEEE'}
                            onPress={() => {this.props.navigator.pop()}}
                        >
                            <Text style={[cs.colorP3, cs.f405, cs.fw4]}>
                                Cancel
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[]}>
                        <TouchableHighlight
                            style={[cs.pl3, cs.pr3, cs.pt1, cs.pb1, cs.bgP5, cs.radiusRound, cs.borderWidth1, cs.borderP5, cs.shadow5]}
                            onPress={() => {
                                this.props.confirmTemp('date'); 
                                this.props.confirmTemp('time') ;
                                this.props.navigator.pop();
                            }}
                            activeOpacity={1}
                            underlayColor={'#0378e9'}
                        >
                            <Text style={[cs.color000, cs.f405, cs.fw4]}>
                                Confirm
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <Spinner visible={this.props.isLoading} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItemPadding: {
        paddingTop: 10,
    },
});

const customStyles = {
    stepIndicatorSize: 15,
    currentStepIndicatorSize:15,
    separatorStrokeWidth: 0.5,
    currentStepStrokeWidth: 4,
    stepStrokeCurrentColor: '#3498db',
    stepStrokeWidth: 4,
    stepStrokeFinishedColor: '#3498db',
    stepStrokeUnFinishedColor: '#bdc3c7',
    separatorFinishedColor: '#3498db',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#3498db',
    stepIndicatorUnFinishedColor: '#fff',
    stepIndicatorCurrentColor: '#fff',
    stepIndicatorLabelFontSize: 1,
    currentStepIndicatorLabelFontSize: 1,
};

const mapStateToProps = state => {
    return {
        datesList: state.booking.datesList,
        timeList: state.booking.timeList,
        dateAndTimes: state.booking.dateAndTimes,
        date: state.booking.new.date,
        time: state.booking.new.time,
        repeatEvery: state.booking.new.repeatEvery,
        isLoading: state.booking.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
       // fetchDateAndTime: () => dispatch(fetchDateAndTimes()),
        updateDate: (date) => dispatch(dateChanged(date)),
        updateTime: (time) => dispatch(timeChanged(time)),
        updateRepeat: (type) => dispatch(repeatEveryChanged(type)),
        initialSet: () => dispatch(setInitialDateAndTime()),
        fetchDates: () => dispatch(fetchDates()),
        setDatenTime: () => dispatch(setDateAndTime()),
        fetchTimes: (data) => dispatch(fetchTimes(data)),
        setTemp: (data) => dispatch(setTemp(data)),
        unsetTemp: (data) => dispatch(unsetTemp(data)),
        confirmTemp: (data) => dispatch(confirmTemp(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
