import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../common/Styles';
import { AppColors } from '../common/Constants.json';

function ScreenHeadingTextBox({ headingText }) {
  return <View style={{ ...Styles.formElement, marginTop: 10 }}>
    <Text style={{ fontSize: 20, color: '#010169', textAlign: "center",fontFamily:"Sansation_Bold" }}>{headingText}</Text>
  </View>;
}

export default ScreenHeadingTextBox;
