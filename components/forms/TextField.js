import React from 'react';
import {View} from 'react-native';
import { Row, Input, Text } from 'native-base';
import cs from '../../constants/SharedStyles';
import ErrorBox from '../ErrorBox';

/**
 * Commonly used on forms ex: signup/login
 */
const TextField = ({ secureTextEntry, keyboardType, autoCapitalize, meta, input: { onChange, onBlur, ...restInput }}) => {
  const border = (meta.touched && meta.error) ? cs.borderError : cs.borderP3;

  return (
    <View style={{flex:1}}>
      <Row style={[cs.borderBWidth1, cs.border300]}>
        <Input
            {...restInput}
            stackedLabel
            onChange={(val) => onChange(val)}
            style={[cs.color800, cs.pl0, cs.f405]}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
        />
      </Row>
      {(meta.touched && meta.error) ? <ErrorBox message={meta.error} /> : null}
    </View>
  )
}

export {TextField};
