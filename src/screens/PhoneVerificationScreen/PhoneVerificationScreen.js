import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Verify from "../../assets/images/Verify.png";
import ImageButtonGreen from "../../assets/images/button_green.png";
import ScreenContainer from "../../components/ScreenContainer";
import styles from "./styles";
import Constants from '../../common/Constants.json';
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import { useLinkProps } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Common from "../../common/Common";
import { apiStatusCodes, endPoints } from "../../services/ApiConstants";
import { setAuthToken } from '../../redux/actionCreator'
import ApiCalls from "../../services/ApiCalls";
import AsyncStorage from "@react-native-community/async-storage";

function PhoneVerificationScreen(props) {

  //let type = props.route.params.type;


  const {generalReducer} = useSelector(state=> state)
  const dispatch = useDispatch()

  if(generalReducer.signUp){

  const [type , setType] = useState(generalReducer.userMode);

  console.log('phone otp screen  type is ',type);
  }

  const [verificationNumbers, setVerificationNumbers] = React.useState([]);
  const [verifyButtonDisabled, setVerifyButtonDisabled] = React.useState(true);

  function onPressNumpad(key) {
    const latestVerificationNumbers = verificationNumbers.concat();
    if (key === "x") {
      latestVerificationNumbers.pop();
      setVerificationNumbers(latestVerificationNumbers);
      lengthCheck(latestVerificationNumbers.length);
      return;
    }
     
    latestVerificationNumbers.push(key);
    setVerificationNumbers(latestVerificationNumbers);
    lengthCheck(latestVerificationNumbers.length);
  }

  function lengthCheck(updatedVerificationNumbersLength) {
    setVerifyButtonDisabled(updatedVerificationNumbersLength === 4 ? false : true);
  }

  function getUserWithToken(token)  {


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);
    //`Bearer ${authToken}` 
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    console.log(Constants.BaseUrl)
    
    fetch(Constants.BaseUrl +"/api/v1/auth/me", requestOptions)
      .then(response => response.json())
      .then(result => 
        
      {  
        console.log("Qr", result)
        if(result.success==true)
        {
          console.log("Roles",result.data.user.roles )
if(result.data.user.roles=="5f4686f6af77930017fbe8ad")
{
  props.navigation.navigate('StudentDashboard',{generalReducer:generalReducer});
}
else
{

  props.navigation.navigate('TeacherDashboard',{generalReducer:generalReducer});
}

        }
    }
        )
      .catch(error => console.log('error', error));
    
}


  async function onPressVerifyButton() {
    let payload = {
      phone: generalReducer.phoneNumber,
      otp: verificationNumbers.join("")
    }
    console.log("payload for votp",payload)
    try {
      let response = await ApiCalls.createPostRequest(endPoints.verifyOtp, payload)
      console.log("response of votp",response)
      if (response.status == apiStatusCodes.STATUS_CODE_200 && response.data.success == true) {
        console.log("in success")
        // await AsyncStorage.setAuthToken(response.data.token)
        dispatch(setAuthToken(response.data.token))
        console.log("Token", response.data.token)
        Common.showSnackbar("Verified Successfully", "success");
     console.log('GN',generalReducer)

       props.navigation.navigate("Verfied", {generalReducer: generalReducer})
    



        
  //   if(generalReducer.signUp){
      
  //     if(generalReducer.userMode == 'teacher'){
  //       props.navigation.navigate('TeacherDashboard');
  //     //  props.navigation.navigate('CreateAccountasTeacher',{type:'teacher'});
  //       // props.navigation.navigate('CreateAccountasTeacher');
  
  
  //     } else if(generalReducer.userMode == 'student'){
  //       // props.navigation.navigate('StudentDashboard');
  //       // props.navigation.navigate('CreateAccountasStudent');
  //       props.navigation.navigate('PersonalinfoScreen',{type:'student' });
  
  
  //     }
  //   } 
  //   if(generalReducer.signIn){

  //     getUserWithToken(response.data.token);
      
  //     // if(generalReducer.userMode == 'teacher'){
  //     //   props.navigation.navigate('TeacherDashboard',{generalReducer:generalReducer});
  //     // //  props.navigation.navigate('CreateAccountasTeacher',{type:'teacher'});
  //     //   // props.navigation.navigate('CreateAccountasTeacher');
  
  
  //     // } else if(generalReducer.userMode == 'student'){
  //     //   // props.navigation.navigate('StudentDashboard');
  //     //   // props.navigation.navigate('CreateAccountasStudent');
  //     // //  props.navigation.navigate('StudentDashboard',{generalReducer:generalReducer});
  
  
  //  //   }
  // // console.log("After", generalReducer)
     
  //   }

      }
      else {
       
        Common.showSnackbar("OTP is not right", "error");
      }
    }
    catch (e) {
      Common.showSnackbar("something went wrong!", "error");
    }


    
    

  }


  
  function onLongPressCrossButton() {
    setVerificationNumbers([]);
    setVerifyButtonDisabled(true);
  }

  console.log("reducer state in phoneverificationscreen",generalReducer)
  console.log("states of phoneverificationscreen",{verificationNumbers,verifyButtonDisabled})

   return  <ScreenContainer  COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
    
          <HeaderAuthScreen />
          <View style={styles.screenHeadingView}>
            <Text style={{...styles.screenHeadingText,color:'#010169'}}>Phone Verification</Text>
          </View>
      
          <View style={styles.verificationCodeView}>
            <VerificationNumber value={verificationNumbers[0]} marginLeft={0} />
            <VerificationNumber value={verificationNumbers[1]} marginLeft={20} />
            <VerificationNumber value={verificationNumbers[2]} marginLeft={20} />
            <VerificationNumber value={verificationNumbers[3]} marginLeft={20} />
          </View>
      
          <View style={styles.reEnterMobileView}>
            <TouchableOpacity onPress={()=>{props.navigation.navigate('PhoneNumberScreen')}}>
              <Text style={styles.reEnterMobileText}>Enter Your Mobile Number</Text>
            </TouchableOpacity>
          </View>
      
          <View style={styles.reEnterMobileView}>
            <Text style={styles.didNotReceiveCodeText}>You didn't a receive a code? {" "}</Text>
      
            <TouchableOpacity>
              <Text style={styles.resendText}>Re-send</Text>
            </TouchableOpacity>
          </View>
      
          <View style={styles.numpadParentViewFirst}>
            <View style={styles.numpadChildView}>
              <NumpadKey value="1" verifyButtonDisabled={verifyButtonDisabled} onPress={onPressNumpad.bind(null, "1")} marginLeft={0} />
              <NumpadKey value="2" verifyButtonDisabled={verifyButtonDisabled} onPress={onPressNumpad.bind(null, "2")} />
              <NumpadKey value="3" verifyButtonDisabled={verifyButtonDisabled} onPress={onPressNumpad.bind(null, "3")} />
            </View>
          </View>
          <View style={styles.numpadParentViewSecond}>
            <View style={styles.numpadChildView}>
              <NumpadKey value="4" verifyButtonDisabled={verifyButtonDisabled} onPress={onPressNumpad.bind(null, "4")} marginLeft={0} />
              <NumpadKey value="5" verifyButtonDisabled={verifyButtonDisabled} onPress={onPressNumpad.bind(null, "5")} />
              <NumpadKey value="6" verifyButtonDisabled={verifyButtonDisabled} onPress={onPressNumpad.bind(null, "6")} />
            </View>
          </View>
          <View style={styles.numpadParentViewSecond}>
            <View style={styles.numpadChildView}>
              <NumpadKey value="7" verifyButtonDisabled={verifyButtonDisabled} onPress={onPressNumpad.bind(null, "7")} marginLeft={0} />
              <NumpadKey value="8" verifyButtonDisabled={verifyButtonDisabled} onPress={onPressNumpad.bind(null, "8")} />
              <NumpadKey value="9" verifyButtonDisabled={verifyButtonDisabled} onPress={onPressNumpad.bind(null, "9")} />
            </View>
          </View>
          <View style={styles.numpadParentViewSecond}>
            <View style={styles.numpadChildView}>
              <View style={styles.numpad(verifyButtonDisabled, 0)}></View>
              <NumpadKey value="0" verifyButtonDisabled={verifyButtonDisabled} onPress={onPressNumpad.bind(null, "0")} />
              <TouchableOpacity 
              
              onLongPress={onLongPressCrossButton} 
              onPress={onPressNumpad.bind(null, "x")} 

          
              style={styles.numpad(verifyButtonDisabled)}><Text style={{...styles.numpadText, borderRadius:5,borderWidth:1, borderColor:'#000',paddingLeft:8,paddingRight:6}}>x</Text></TouchableOpacity>
            </View>
          </View>
      
      
          <View style={styles.verifyButton}>
            <TouchableOpacity
              style={styles.verifyTouchableOpacity}
              onPress={onPressVerifyButton}
              disabled={verifyButtonDisabled}
            >
              <ImageBackground
                resizeMode="stretch"
                source={Verify}
                style={{ height: "100%", width: "100%", justifyContent: "center", opacity: verifyButtonDisabled ? 0.5 : 1 }}>
                {/* <Text
                  style={styles.verifyTouchableOpacityText}>
                  Verify
                </Text> */}
              </ImageBackground>
            </TouchableOpacity>
          </View>
      
        </ScreenContainer>;
}


function VerificationNumber({ value, marginLeft }) {
  return value === undefined ? (
    <View style={styles.circleButton(marginLeft)} />
  ) : (
      <ImageBackground style={styles.circleButton(marginLeft)} source={ImageButtonGreen} resizeMode="stretch">
        <Text style={styles.circleText}>{value}</Text>
      </ImageBackground>
    );
}

function NumpadKey({ value, verifyButtonDisabled, onPress, marginLeft }) {
  return <TouchableOpacity
    onPress={onPress}
    disabled={!verifyButtonDisabled}
    style={styles.numpad(verifyButtonDisabled, marginLeft)}
  >
    <Text style={styles.numpadText}>{value}</Text>
  </TouchableOpacity>;
}

  

export default PhoneVerificationScreen ;