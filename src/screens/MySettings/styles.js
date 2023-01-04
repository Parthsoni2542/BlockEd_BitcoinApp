import { StyleSheet } from 'react-native';
import { AppColors } from "../../common/Constants.json";
import CommonStyles from "../../common/Styles";

const styles = StyleSheet.create({

  screenHeadingView: {
    ...CommonStyles.formElement,
    marginTop: 10
  },
  screenHeadingText: {
    fontSize: 21,
    color: AppColors.Font.Heading,
    textAlign: "center",
    fontFamily:"Sansation_Bold"
  },
  ImageQrView: {
   // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    paddingTop: 25,
    paddingBottom: 45
  },
  MySettings: {
    fontSize: 16,
    color: '#767676',
    textAlign: "center",
    fontFamily:"Sansation_Bold"
  
  }
});

export default styles;
