import React from "react";
import {
  View,
  Image,
  StyleSheet,
} from "react-native";
import ImageHeader from "../../assets/images/header.png";

const styles = StyleSheet.create({
  headerParent: { height: 25,width:"100%", marginTop:40, marginBottom: 25, alignItems: "center", justifyContent: "center"}
});

export default function HeaderAuthScreen() {
  return <View style={styles.headerParent}>
    <Image source={ImageHeader} resizeMode="stretch" width='100%'  height="100%" />
  </View>;
};
