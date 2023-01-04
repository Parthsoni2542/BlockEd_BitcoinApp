import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
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
import Styles from "../../common/Styles";

function Verified(props) {

  //let type = props.route.params.type;

console.log('Gnn',props.route.params.generalReducer)
  const {generalReducer} = useSelector(state=> state)
  const dispatch = useDispatch()

  if(generalReducer.signUp){

  const [type , setType] = useState(generalReducer.userMode);

  console.log('phone otp screen  type is ',type);
  }

  const [verificationNumbers, setVerificationNumbers] = React.useState([]);
  const [verifyButtonDisabled, setVerifyButtonDisabled] = React.useState(true);

 


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
  



        
    if(props.route.params.generalReducer.signUp){
      
      if(props.route.params.generalReducer.userMode == 'teacher'){
        props.navigation.navigate('TeacherDashboard');
      //  props.navigation.navigate('CreateAccountasTeacher',{type:'teacher'});
        // props.navigation.navigate('CreateAccountasTeacher');
  
  
      } else if(props.route.params.generalReducer.userMode == 'student'){
        // props.navigation.navigate('StudentDashboard');
        // props.navigation.navigate('CreateAccountasStudent');
        props.navigation.navigate('PersonalinfoScreen',{type:'student' });
  
  
      }
    } if(props.route.params.generalReducer.signIn){
      console.log('Hello')

      getUserWithToken(generalReducer.authToken);
      
    
     
    }

      

    
    

  }


  
 

  console.log("reducer state in phoneverificationscreen",generalReducer)
  console.log("states of phoneverificationscreen",{verificationNumbers,verifyButtonDisabled})

   return  <ScreenContainer  COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
    
          <HeaderAuthScreen />
          <View style={styles.screenHeadingView}>
            <Text style={{...styles.screenHeadingText,color:'#010169'}}>Phone Verification</Text>
          </View>
      
        
  
        
          <Image
        style={{alignSelf:'center', marginTop:'20%', width:95, height:88}}
        source={require('./../../assets/images/ticki.png')}
        />
      
      
          <View style={styles.verifyButton}>
            <TouchableOpacity
              style={{width:'90%',marginTop:'40%',padding:13,borderRadius:10,marginBottom:15,backgroundColor: "#3FB65F"}}
              onPress={onPressVerifyButton}
              
            >
             
                <Text
                  style={{color:'#ffff',alignSelf:'center', fontWeight:'bold',fontSize:20}}>
                  NEXT
                </Text>
   
            </TouchableOpacity>
          </View>
      
        </ScreenContainer>;
}




  

export default Verified ;