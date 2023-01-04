import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  
} from "react-native";
import { AppColors } from './../common/Constants.json';

const style = StyleSheet.create({
  safeAreaView: {
    // backgroundColor: AppColors.LightMode.BackgroundColor,
    backgroundColor:'white',
    flex: 1,
  }
});

function ScreenContainer({ children , COLOR , statBrColor , BrStyle}) {
  return <>
    <StatusBar barStyle={BrStyle} backgroundColor={statBrColor} />
    <SafeAreaView style={{...style.safeAreaView,backgroundColor:COLOR}}>
  
        {children}
      
    </SafeAreaView>
  </>;
}

export default ScreenContainer;
