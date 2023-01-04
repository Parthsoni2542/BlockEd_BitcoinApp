import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../common/Styles';
import { AppColors } from '../common/Constants.json';

function ScreenDetailsTextBox({ text }) {
  return <View style={{ ...Styles.formElement, marginTop: 10, marginBottom: 20 }}>
    <Text style={{ fontSize: 20, color: '#767676', textAlign: "center",fontFamily:"Sansation_Bold",fontStyle:"normal", }}>{text}</Text>
  </View>;
}

export default ScreenDetailsTextBox;