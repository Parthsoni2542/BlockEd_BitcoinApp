import React,{ useState, useEffect } from "react";
import AsyncStorageCommunity from "@react-native-community/async-storage";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity    
  } from "react-native";
  import fb from "../../assets/images/fb.png";
  import insta from "../../assets/images/insta.png";
  import agora from "../../assets/images/agora.png";
  import Gclassroom from "../../assets/images/Gclassroom.png";
  import zoom3 from "../../assets/images/zoom3.png";

  import styles from "./styles";
  import ScreenContainer from "../../components/ScreenContainer";
  import HeaderAuthScreen from "../../components/HeaderAuthScreen";
  import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
    import {
      GoogleSignin,
      statusCodes,
    } from '@react-native-community/google-signin';
import ApiCalls from "../../services/ApiCalls";
import { endPoints } from "../../services/ApiConstants";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import Common from "../../common/Common";



  function SocialLogin1(props) {

    const [user, setUser] = useState();

    const [isLoading, setIsLoading] = useState(false);

// for google sign In
useEffect( () => {

    GoogleSignin.configure({
        webClientId: '244862065242-bntq0lcapkbtef2a3g6chaaiattfgilj.apps.googleusercontent.com',
        androidClientId: '244862065242-fb49lpnem6qc89lrushnid3o9ddjq6fb.apps.googleusercontent.com',
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
},[]);


const signIn = async() => {
    setIsLoading(true)
    // google sign In
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // this.setState({ userInfo });
        console.log('user info is -------- ', userInfo)
        setUser(userInfo.user)
        await AsyncStorageCommunity.setItem('userFromGoogle',JSON.stringify(userInfo.user));
        let res = await ApiCalls.createPostRequest(endPoints.socialAcc,{
          appName:"google",
          authResponse: userInfo.user
        })
        console.log("res from social acc",res)
        if(res.data.data._id){
          Common.showSnackbar("Google Login Successfully!", "success");
          props.navigation.navigate('SocialLogin2',{
            signInWithGoogle:true,
            signInWithFacebook: false,
            userProfile: userInfo.user,
            socialAccIdForGoogle: res.data.data._id
        })
        }else{
          Common.showSnackbar("Unable to get the id!", "error");
        }
        setIsLoading(false)
      } catch (error) {
          console.log("error in catch",error)
          setIsLoading(false)
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log("error occured SIGN_IN_CANCELLED");
            Common.showSnackbar("SIGN_IN_CANCELLED", "error");
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log("error occured IN_PROGRESS");
            Common.showSnackbar("IN_PROGRESS", "error");
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log("error occured PLAY_SERVICES_NOT_AVAILABLE");
            Common.showSnackbar("PLAY_SERVICES_NOT_AVAILABLE", "error");
          } else {
            console.log(error)
            console.log("error occured unknow error");
            Common.showSnackbar("unknow error", "error");
          }
      }
}

    return(
<ScreenContainer  COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>

            <HeaderAuthScreen  />

            <View style={styles.socialLoginHeadingView} >
                <Text style={styles.screenHeadingText}>Social Login</Text>
            </View>

            <TouchableOpacity >
                <View style={styles.row}>
                <Text style={styles.txt}>Login with Agora</Text>
                <Image source={agora} style={{...styles.img, width:45,height:45}} />
                </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={signIn} >
                <View style={styles.row}>
                    <Text style={styles.txt}>Login with Classroom (required)</Text>
                    {isLoading?
                    <ActivityIndicator size="large" color="#3FB65F" />
                    :
                    <Image source={Gclassroom} style={{...styles.img,marginRight:5}} />
                    }
                    
                </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>Common.showSnackbar("first login with Google Classroom is mandatory!", "info")}>
                <View style={styles.row}>
                    <Text style={styles.txt}>Login with Facebook</Text>
                    <Image source={fb} style={{...styles.img,marginRight:5}} />
                </View>
            <View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity >
                <View style={styles.row}>
                    <Text style={styles.txt}>Login with Instagram</Text>
                    <Image source={insta} style={{...styles.img,marginRight:5}} />
                </View>
            </TouchableOpacity>

        </ScreenContainer>
    )
  }

  export default SocialLogin1;