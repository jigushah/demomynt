import React from 'react';
import { Text, View, Picker, TouchableOpacity, EventSubscription } from 'react-native';
import { Field, reduxForm as form } from 'redux-form';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Grid, Col, Row, Input } from 'native-base';
import Modal from 'react-native-modalbox';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import cs from '../../../constants/SharedStyles';
import { PickerComponent } from '../../../components/forms/Picker';
import BackButtonCustom from '../../../navigation/BackButtonCustom';
import SaveButton from '../../../components/SaveButton';
import { makeChanged, modelChanged, addVehicle } from '../../../actions/VehicleActions';
import { MaterialIcons } from '@expo/vector-icons';

const mapStateToProps = state => {
  return {
    make: state.vehicle.new.make,
    model: state.vehicle.new.model,
    makes: state.vehicle.makes,
    models: state.vehicle.models,
    isLoading: state.vehicle.isLoading,
  };
};

@form({
  form: 'VehicleAdd',
  validate: (values) => {
    const errors = {};

    if (!values.make) {
      errors.make = 'Make is required';
    }

    if (!values.model) {
      errors.model = 'Model is required';
    }

    if (!values.year) {
      errors.year = 'Year is required';
    }

    if (!values.color) {
      errors.color = 'Color is required';
    }

    return errors;
  },
  onSubmit: (values, dispatch) => {
    // TODO: this needs to be able to handle multiple dispatch events instead of
    // just one
    return dispatch(addVehicle(values,true));
  }
})
@connect(mapStateToProps, { makeChanged, modelChanged, addVehicle })
class VehicleAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMakeOpen: false,
      isModelOpen: false
    };
  }

  _subscriptionSave: EventSubscription;

  componentWillMount() {
    this._subscriptionSave = this.props.route.getEventEmitter().addListener('save', this._handleSave);
  }

  componentWillUnmount() {
    this._subscriptionSave.remove();
  }

  _handleSave = () => {
    const { handleSubmit } = this.props;
    handleSubmit();
  }

  renderMakeList = () => {
    if (_.isEmpty(this.props.makes)) {
      return <Text>Sorry, there are no makes available right now.</Text>;
    }
    const Item = Picker.Item;
    const list = _.map(this.props.makes, (item, id) => {
      return (
        <Item key={id} label={item.make} value={item.make} />
      );
    });

    return (
      <Field
        name="make"
        component={PickerComponent}
        action={this.props.makeChanged}
        selected={this.props.make}
        list={list}
      />
    );
  }

  renderModelList = () => {
    const models = this.props.models[this.props.make];
    const Item = Picker.Item;
    const list = _.map(models, (item, id) => {
      return (
        <Item key={id} label={item.model} value={item.id} />
      );
    });

    return (
      <Field
        name="model"
        component={PickerComponent}
        action={this.props.modelChanged}
        selected={this.props.model.model}
        list={list}
      />
    );
  }

  onSelectMake = () => {
    this.setState({ isMakeOpen: true });
  }

  onSelectModel = () => {
    if (!this.props.make) return;
    this.setState({ isModelOpen: true });
  }

  render = () => {
    return (
      <View style={[cs.container]}>
        <KeyboardAwareScrollView>
          <View>
            <Grid style={[cs.mt2]}>
              <Row>
                <Text style={[cs.ml2, cs.mb1, cs.fw5, cs.color500]}>
                  Primary Vehicle Info
                </Text>
              </Row>
            </Grid>
            <View>
              <Field
                name="make"
                make={this.props.make}
                onSelect={this.onSelectMake}
                component={makePicker}
                label="Make"
              />
              <Field
                name="model"
                make={this.props.make}
                model={this.props.model}
                onSelect={this.onSelectModel}
                component={modelPicker}
                label="Model"
              />
              <Field
                name="year"
                type="text"
                component={renderField}
                label="Year"
              />
              <Field
                name="color"
                type="text"
                component={renderField}
                label="Color"
              />
              <Field
                name="license_plate"
                type="text"
                component={renderField}
                label="License Plate # (optional)"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Modal
          isOpen={this.state.isMakeOpen}
          onClosed={() => this.setState({ isMakeOpen: false })}
          style={[cs.vehicleModal]}
          position={'bottom'}
          swipeArea={20}
        >
          <View style={[cs.flx1]}>
            <Grid style={[cs.borderBWidth1, cs.border200]}>
              <Col>
                <Row style={[cs.ml4]}>
                  <Text style={[cs.pt1, cs.f405, cs.fw5]}>
                    Make
                  </Text>
                </Row>
              </Col>
              <Col>
                <Row style={[cs.mr4, cs.selfEnd]}>
                  <Text
                    style={[cs.pt1, cs.pb1, cs.f405, cs.fw4, cs.u, cs.colorP2]}
                    onPress={() => this.setState({ isMakeOpen: false })}
                  >
                    Select
                  </Text>
                </Row>
              </Col>
            </Grid>
            <View>
              {this.renderMakeList()}
            </View>
          </View>
        </Modal>
        <Modal
          isOpen={this.state.isModelOpen}
          onClosed={() => this.setState({ isModelOpen: false })}
          style={[cs.vehicleModal]}
          position={'bottom'}
          swipeArea={20}
        >
          <View style={[cs.flx1]}>
            <Grid style={[cs.borderBWidth1, cs.border200]}>
              <Col>
                <Row style={[cs.ml4]}>
                  <Text style={[cs.pt1, cs.pb1, cs.f405, cs.fw5]}>
                    Model
                  </Text>
                </Row>
              </Col>
              <Col>
                <Row style={[cs.mr4, cs.selfEnd]}>
                  <Text
                    style={[cs.pt1, cs.pb1, cs.f405, cs.fw4, cs.u, cs.colorP2]}
                    onPress={() => this.setState({ isModelOpen: false })}
                  >
                    Select
                  </Text>
                </Row>
              </Col>
            </Grid>
            <View>
              {this.renderModelList()}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

VehicleAdd.route = {
  navigationBar: {
    title: 'Add Vehicle',
    backgroundColor: '#fff',
    renderLeft: (route, props) => <BackButtonCustom />,
    renderRight: (state: ExNavigationState) => {
      const { config: { eventEmitter }  } = state;
      return (
        <TouchableOpacity
          onPress={() => eventEmitter.emit('save')}
          style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: 15
          }}
        >
          <MaterialIcons name='done' size={25} color='#000000' />
        </TouchableOpacity>
      );
    }
  }
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  const renderMessage = () => {
    return (touched && error) ? <Text style={[cs.colorP3]}>{error}</Text> : null;
  };

  return (
    <Row style={[cs.pl1, cs.pr1, cs.pt05, cs.pb05, cs.bg000, cs.borderBWidth1, cs.border200]}>
      <Input
        {...input}
        placeholder={label}
        style={[cs.flx1, cs.fi5, cs.color800]}
      />
      {renderMessage()}
    </Row>
  );
};

const makePicker = ({ make, onSelect, input, label, type, meta: { touched, error, warning } }) => {
  const renderMessage = () => {
    return (touched && error) ? <Text style={[cs.colorP3]}>{error}</Text> : null;
  };

  return (
    <Row style={[cs.pl1, cs.pr1, cs.pt05, cs.pb05, cs.bg000, cs.borderWidth1, cs.border200]}>
      <Text
        style={[cs.flx1, cs.pt1, cs.pb1, cs.pl05, cs.f5, cs.color800]}
        onPress={onSelect}
      >
        {make || 'Make'}
      </Text>
      {renderMessage()}
    </Row>
  );
};

const modelPicker = ({ make, model, onSelect, input, label, type, meta: { touched, error, warning } }) => {
  const renderMessage = () => {
    return (touched && error) ? <Text style={[cs.colorP3]}>{error}</Text> : null;
  };

  return (
    <Row style={[cs.pl1, cs.pr1, cs.pt05, cs.pb05, cs.bg000, cs.borderBWidth1, cs.border200]}>
      <Text
        style={[{ opacity: (make) ? 1 : 0.5 }, cs.flx1, cs.pt1, cs.pb1, cs.pl05, cs.f5, cs.color800]}
        onPress={onSelect}
      >
        {(model && model.model) || 'Model'}
      </Text>
      {renderMessage()}
    </Row>
  );
};

export default VehicleAdd;
