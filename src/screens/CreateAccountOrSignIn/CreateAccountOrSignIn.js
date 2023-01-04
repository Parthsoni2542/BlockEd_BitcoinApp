import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ImageLandingPage from "../../assets/images/landing_page.png";
import ShadowImageLandingPage from "../../assets/images/shadow_landing_page.png";
import ImageCreateAccountButton from "../../assets/images/button_create_account.png";
import ImageSignInButton from "../../assets/images/button_sign_in.png";
import Carousel from "../../assets/images/carousel.png"
import Common from "../../common/Common";
import ScreenContainer from "../../components/ScreenContainer";
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import Styles from "../../common/Styles";
import Constants from "../../common/Constants.json";
import ChooseLanguage from "../../components/ChooseLanguage"
import { useDispatch, useSelector } from "react-redux";
import { setLogOutMode, setSignInMode, setSignUpMode } from "../../redux/actionCreator";
export default function CreateAccountOrSignIn({ navigation }) {

  const [openModel , setOpenModel] = React.useState(false);

  const dispatch = useDispatch()

  const {generalReducer} = useSelector(state=> state)


  function onPressCreateAccount() {
    dispatch(setSignUpMode(true))
    dispatch(setSignInMode(false))
    dispatch(setLogOutMode(false))
    navigation.push("CreateAccount");
  }

  function testPhoneVerificationScreen() {
    // navigation.push("MySettings");
    // navigation.push("ReLogin");
    dispatch(setSignInMode(true))
    dispatch(setLogOutMode(false))
    dispatch(setSignUpMode(false))
    //Me
   // navigation.push("SocialLogin1");
   navigation.push("PhoneNumberScreen");

  }
  

  console.log("reducer state in createaccountorsignin",generalReducer)



  return <ScreenContainer COLOR={"white"}  statBrColor={"white"}  BrStyle={"dark-content"} >

    <View style={{ flexDirection: "row-reverse",position:'relative', top:10 }}>
      <TouchableOpacity onPress={ () => {setOpenModel(!openModel)}} style={{ marginRight: 20, padding: 2 }}>
        <Text style={{fontSize:16,fontFamily: 'Sansation_Bold',color:'#010169', fontWeight:'bold'}}>Choose Language</Text>
      </TouchableOpacity>

    </View>

     {openModel == true ? 
          <>
          <ChooseLanguage openModel={true} />
          </> 
    
        : null}
    <HeaderAuthScreen />

    <View style={{ height: 280, marginTop: 10,marginBottom: 20, alignItems: "center" }}>
      <Image source={ImageLandingPage} resizeMode="contain" style={{zIndex:1}}/>
      
      <Image source={ShadowImageLandingPage} resizeMode="contain" style={{position: 'relative', bottom: 22}} />
    </View>

    <View className="textClass" style={{ alignItems: "center", width: "90%", marginLeft: "5%", marginRight: "5%" }}>

      <Text style={{...Styles.registerScreensSubtitleTextHeadingStyle1,fontWeight: 'normal', width: "100%", textAlign: "center", }}>PLEASE CREATE AN ACCOUNT</Text>
      <Text style={{...Styles.registerScreensSubtitleTextHeadingStyle2,  width: "100%", textAlign: "center",paddingBottom: 20}}  >OR SIGN IN</Text>

      <View style={{marginBottom: 22}}>
        <Image source={Carousel} />
      </View>


       
       
       
          <TouchableOpacity
       

 style={{...Styles.LandingButton,marginBottom:15,backgroundColor: "#3FB65F" }}

        onPress={onPressCreateAccount}
       
      >
        <Text style={{...Styles.LandingButtonFont, color:'#FFFFFF', textAlign: "center", }}>CREATE ACCOUNT</Text>
      </TouchableOpacity>



 <TouchableOpacity
       
       style={{...Styles.LandingButton,backgroundColor:'#FFFFFF', borderWidth:1,borderColor:'#3FB65F' }}


        onPress={testPhoneVerificationScreen}
       
      >
        <Text style={{...Styles.LandingButtonFont, color:'#3FB65F', textAlign: "center", }}>SIGN IN</Text>
      </TouchableOpacity>

      

      


   

    </View>
  </ScreenContainer>;
};
