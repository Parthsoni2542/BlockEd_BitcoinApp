import React, { useState, useEffect } from "react";
import AsyncStorageCommunity from "@react-native-community/async-storage";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar
  } from "react-native";
  import fb from "../../assets/images/fb.png";
  import insta from "../../assets/images/insta.png";
  import agora from "../../assets/images/agora.png";
  import Gclassroom from "../../assets/images/Gclassroom.png";

  import styles from "./styles";

  import Styles from "../../common/Styles";
  import ScreenContainer from "../../components/ScreenContainer";
  import HeaderAuthScreen from "../../components/HeaderAuthScreen";
  import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-community/google-signin';
  import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { useSelector } from "react-redux";
import Common from "../../common/Common";

  function SocialLogin2(props) {
    const {userMode, signUp, signIn} = useSelector(state => state.generalReducer)

    const [type , settype ] = useState(userMode)

// for google sign In
useEffect( () => {

    GoogleSignin.configure({
        webClientId: '244862065242-bntq0lcapkbtef2a3g6chaaiattfgilj.apps.googleusercontent.com',
        androidClientId: '244862065242-fb49lpnem6qc89lrushnid3o9ddjq6fb.apps.googleusercontent.com',
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
},[]);

    useEffect(()=>{
        //get User data
        async function getUser(){
            let user;
            await AsyncStorageCommunity.getItem('userFromGoogle')
            .then(res=>{
                console.log('inside',JSON.parse(res))
                user = res
            })
        }
        getUser()
    },[])

    const handleNavigation = () => {
        console.log('Type is ----- ',type);

        if(signUp){
            props.navigation.navigate('CreateAccountasStudent',{
                type:type,
                socialAccIdForGoogle:props.route.params.socialAccIdForGoogle
            })
        }else if(signIn){
            props.navigation.navigate('PhoneNumberScreen')
        }
    }

    const signUpWithGoogle = async () => {
        
        
        if(props.route.params.signInWithGoogle){
            Common.showSnackbar("Already used this option. Use another one!", "info");
        }else{
            //"sign in process"
            try {
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                setUser(userInfo.user)
                await AsyncStorageCommunity.setItem('userFromGoogle',JSON.stringify(userInfo.user));
                if(signUp){
                props.navigation.navigate('CreateAccountasStudent',{
                    signInWithGoogle:true,
                    signInWithFacebook: props.route.params.signInWithFacebook,
                    userProfile: userInfo.user,
                    socialAccIdForGoogle:props.route.params.socialAccIdForGoogle
                })
            }else if (signIn){
                props.navigation.navigate('PhoneNumberScreen')
            }
              } catch (error) {
                  console.log("error in catch",error)
                  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    console.log("error occured SIGN_IN_CANCELLED");
                    // user cancelled the login flow
                  } else if (error.code === statusCodes.IN_PROGRESS) {
                    console.log("error occured IN_PROGRESS");
                    // operation (f.e. sign in) is in progress already
                  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    console.log("error occured PLAY_SERVICES_NOT_AVAILABLE");
                  } else {
                    console.log(error)
                    console.log("error occured unknow error");
                  }
              }
        }

    }


    //setting up for facebook login
    const infoRequest = new GraphRequest(
        '/me', 
        {
          parameters: {
            'fields': {
                'string' : 'email,name'
            }
          }
        },
        (err, res) => {
          console.log({err, res});
          if(!err){
            AsyncStorageCommunity.setItem('userFromFacebook',JSON.stringify(res));
            if(signUp){
            props.navigation.navigate('CreateAccountasStudent',{
                signInWithFacebook: true,
                signInWithGoogle:false,
                userProfile: res,
            })
        }else if (signIn){
            props.navigation.navigate('PhoneNumberScreen')
        }
          }
        }
    );
    
    // facebook login function
    const handleFacebookLogin = () => {
        if(props.route.params.signInWithFacebook){
            Common.showSnackbar("Already used this option. Use another one!", "info");
            
        }else{
            // alert("sign in process")
            LoginManager.logInWithPermissions(["public_profile", "email"]).then(
                function(result) {
                  if (result.isCancelled) {
                    console.log("Login cancelled");
                  }
                  else {
                    console.log("Login success with permissions: " + result.grantedPermissions.toString());
                    const data = new GraphRequestManager().addRequest(infoRequest).start();
                    console.log("+++",data)
          
                  }
                },
                function(error) {
                  console.log("Login fail with error: " + error);
                }
              );
        }

    }

    return(
<ScreenContainer  COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>

        {/* <ScreenContainer COLOR={"white"}  statBrColor={"white"}  BrStyle={"dark-content"}> */}
            {/* <StatusBar barStyle="dark-content"  backgroundColor="white" /> */}
            <HeaderAuthScreen />
            


            <View style={styles.screenHeadingView} style={{paddingBottom: 25}}>
                <Text style={styles.socialHeadingText}>Social Login</Text>
            </View>

        


                <View style={styles.secondaccounttextView} >
                    <Text style={styles.secondaccounttext}>Have a second account? Login here</Text>
                </View>


            <TouchableOpacity>

                    <View style={styles.row}>
                        <Text style={styles.txt}>Login with Agora</Text>
                        <Image source={agora} style={{...styles.img, width:45,height:45}} />
                    </View>
            </TouchableOpacity>


        <View pointerEvents={props.route.params.signInWithGoogle?'none' : 'auto'}>
        <TouchableOpacity onPress={() => signUpWithGoogle()} >

            <View style={[styles.row, {backgroundColor:   props.route.params.signInWithGoogle?'lightgrey' : '#CCEEE1'}]}>
                <Text style={styles.txt}>Login with Classroom (required)</Text>
                <Image source={Gclassroom} style={{...styles.img,marginRight:5}} />
            </View>
            </TouchableOpacity>

            </View>

    

            <TouchableOpacity onPress={() => handleFacebookLogin()} >

            <View style={styles.row}>
                <Text style={styles.txt}>Login with Facebook</Text>
                <Image source={fb} style={{...styles.img,marginRight:5}} />
            </View>
            </TouchableOpacity>


            <TouchableOpacity>

            <View style={styles.row}>
                <Text style={styles.txt}>Login with Instagram</Text>
                <Image source={insta} style={{...styles.img,marginRight:5}} />
            </View>
            </TouchableOpacity>




            <TouchableOpacity

            style={{marginTop:150}}
             onPress={() => handleNavigation()} >

            <View style={{alignSelf:'center'}}>
                <Text style={styles.skipTxt}>Skip</Text> 
                {/* <Image source={insta} style={{...styles.img,marginRight:5}} /> */}
            </View>
            </TouchableOpacity>

            <TouchableOpacity
       
       onPress={() => handleNavigation()}
       style={{...Styles.LandingButton,width:'90%',alignSelf:'center',marginBottom:15,marginTop: 20,backgroundColor: "#3FB65F" }}
      
              
             
            >
              <Text style={{...Styles.LandingButtonFont, color:'#FFFFFF', textAlign: "center", }}>NEXT</Text>
            </TouchableOpacity>


        </ScreenContainer>
    )
  }

  export default SocialLogin2;