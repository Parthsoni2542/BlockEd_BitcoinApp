import React, { useState ,useRef} from 'react';
import {View , Text,StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import ScreenContainer from "../../components/ScreenContainer";
import PhoneInput from "react-native-phone-number-input";
import ApiCalls from '../../services/ApiCalls';
import { endPoints } from '../../services/ApiConstants';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { setPhoneNumber } from '../../redux/actionCreator';
import Common from '../../common/Common';
const PhoneNumberScreen = (props) =>{
    
    const dispatch = useDispatch()

    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    async function onPressSubmit() { 
        setIsLoading(true)
        if( !value || !formattedValue){
            setIsLoading(false)
            Common.showSnackbar("All fields are required!", "error");
            return
        }

        let payload = {
          phone: formattedValue
        }
    const result = await ApiCalls.createPostRequest(endPoints.loginUserByNumber,payload)

    if(result.data){
        console.log("ResultData",result.data)
        if(result.data.success){
            dispatch(setPhoneNumber(formattedValue))
            setIsLoading(false)
            props.navigation.navigate('PhoneVerificationScreen');      
            
          }
        }else{
            setIsLoading(false)
            Common.showSnackbar("This number doesnot have any account.", "error");
            
          }
      }

    return(

        // <ScreenContainer COLOR={"white"}  statBrColor={"white"}  BrStyle={"dark-content"}>
<ScreenContainer  COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>

        <HeaderAuthScreen />

        <View style={styles.WelcomeHeadingContiner}>
            <Text style={styles.headingTxt}>WELCOME BACK</Text>
        </View>


        <View style={styles.WelcomeHeadingContiner}>
            <Text style={{...styles.headingTxt,fontWeight:'100',fontSize:15}}>Fill in your account using</Text>
        </View>

        <View style={styles.numberContainer}>
            {/* <TextInput placeholder="Enter Mobile Number"/> */}
            <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="DM"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            // withShadow
            autoFocus
            // textInputStyle={{backgroundColor:'white'}}
            // containerStyle={{color:'white'}}
          />
        </View>

        <View style={styles.WelcomeHeadingContiner}>
            <Text style={{...styles.headingTxt,fontSize:15,color:'red'}}>Forgot Password</Text>
        </View>

        {!isLoading ? 
        <TouchableOpacity onPress={ () =>onPressSubmit()} style={{marginTop:20,justifyContent:'center',alignItems:'center',backgroundColor:'#3FB65F',height:50,marginHorizontal:10,borderRadius:5}}>
            
            <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>NEXT</Text>
            
            
        </TouchableOpacity>
        :
        <ActivityIndicator size="large" color="#3FB65F" />
        }

        



        </ScreenContainer>

    );
}

const styles = StyleSheet.create({
    WelcomeHeadingContiner:{
        margin:10,
        // borderWidth:1,
        justifyContent:'center',
        alignItems:'center',

    },
    headingTxt:{
        fontSize:20,
        fontWeight:"bold",

    },
    numberContainer:{
        marginTop:50,
        marginHorizontal:40,
        // borderWidth:1,
        backgroundColor:'white',
        height:70,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center',
        elevation:5
    }
})

export default PhoneNumberScreen;
