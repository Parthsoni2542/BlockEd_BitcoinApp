import CommonStyles from "../../common/Styles";
import { AppColors } from "../../common/Constants.json";
import { StyleSheet } from 'react-native';
import Dimensions from "../../common/helpers/Dimensions";
const screenWidth = Dimensions.portraitWidth;

const styles = StyleSheet.create({
  screenHeadingView: {
    ...CommonStyles.formElement,
    marginTop: 10
  },
  screenHeadingText: {
    fontSize: 21,      
    color: AppColors.Font.Heading,
    textAlign: "center",
    fontFamily: "Sansation_Bold"
  },
  verificationCodeView: { ...CommonStyles.formElement, marginTop: 20 },
  reEnterMobileView: { ...CommonStyles.formElement, marginTop: 20 },
  resendText: { marginBottom:10,fontSize: 17, textDecorationLine: "underline", fontFamily: "Sansation_Regular" },
  reEnterMobileText: { fontSize: 17, textDecorationLine: "underline", color: '#00A86B', fontFamily: "Sansation_Regular" },
  didNotReceiveCodeText: { fontSize: 17, fontFamily: "Sansation_Regular"  },
  numpadParentViewFirst: { ...CommonStyles.formElement, marginTop: 60 },
  numpadParentViewSecond: { ...CommonStyles.formElement, marginTop: 10 },
  numpadChildView: { ...CommonStyles.formElement, width: screenWidth, },
  verifyTouchableOpacity: { width: screenWidth * 0.9, height: 50 },
  verifyTouchableOpacityText: { textTransform: "uppercase", color: "white", textAlign: "center", textAlignVertical: "center" },
  verifyButton: {
    ...CommonStyles.formElement,
    marginTop: 40,
    paddingBottom: 20,
  },
  circleButton: function (marginLeft) {
    return {
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: marginLeft,
      overflow: "hidden",
      backgroundColor: "white",
    };
  },
  circleText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold"
  },

  numpad: (verifyButtonDisabled, marginLeft) => {
    const style = {
      opacity: verifyButtonDisabled ? 1 : 0.5,
      marginLeft: 40,
      width: 60,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
    };

    if (marginLeft !== undefined) {
      style.marginLeft = marginLeft;
    }
    return style;
  },
  numpadText: {
    fontSize: 17,
    fontFamily: 'Sansation_Bold'
  }
});

export default styles;
