import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Dimensions from '../common/helpers/Dimensions';
import { AppColors } from '../common/Constants.json';

const socialAuthButtonHeight = Dimensions.portraitHeight / 12;
const styles = StyleSheet.create({
  socialAuthButtonContainer: {
    marginTop: socialAuthButtonHeight * 0.2,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    backgroundColor: AppColors.LightMode.SocialAuthButtonBackgroundColor,
    width: Dimensions.portraitWidth * 0.9,
    height: socialAuthButtonHeight,
    borderRadius: socialAuthButtonHeight / 5,
  },
  socialAuthButtonLabel: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "left",
    color: AppColors.Font.HeadingDescription,
  },
  socialAuthButtonIcon: {
    width: socialAuthButtonHeight * 0.5,
    height:socialAuthButtonHeight,
  }
});

export default function SocialAuthButton({ label, imageSource, onPress }) {
  return <TouchableOpacity style={styles.socialAuthButtonContainer} onPress={onPress}>
    <Text style={styles.socialAuthButtonLabel}>{label}</Text>
    <Image source={imageSource} style={styles.socialAuthButtonIcon} resizeMode="contain" />
  </TouchableOpacity>;
}