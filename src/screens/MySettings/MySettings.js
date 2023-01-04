import React , {useState, useEffect} from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Switch
  } from "react-native";
  import ImageQr from "../../assets/images/ImageQr.png";
  import styles from "./styles";
  import Styles from "../../common/Styles";
  import ScreenContainer from "../../components/ScreenContainer";
  import HeaderAuthScreen from "../../components/HeaderAuthScreen";
  import QRCode from 'react-native-qrcode-svg';
  import AsyncStorage from "./../../services/AsyncStorage";
  import Constants from '../../common/Constants.json';

  import fb from "../../assets/images/fb.png";
  import insta from "../../assets/images/insta.png";
  import zoom from "../../assets/images/zoom.png";
  import Gclassroom from "../../assets/images/Gclassroom.png";
  import more from '../../assets/images/more.png'



  function MySettings(props) {

    const [qr, setQr] = useState('Hii');

    async function createPostRequest()  {

        let auth = await AsyncStorage.getAllInfo();
        let json = JSON.parse(auth)
        console.log("Token",json.authToken)




        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer "+json.authToken);
        
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
            setQr(result.data.user.qrcode)
            setName(result.data.profile.firstName)
            setNumber(result.data.user.phone)
            setEmail(result.data.user.email)
            console.log("QR",result.data)
        
        }
            )
          .catch(error => console.log('error', error));


        
    }



    useEffect(() => {
      createPostRequest()
      }, []);



    const [isEnabled, setIsEnabled] =useState(false);
     const [name, setName] = useState('');
    const [Number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    
    
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    return(
        <ScreenContainer COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
            <View >
            <HeaderAuthScreen />

            <Image source={more} style={{position: 'absolute', right:40, top:40}}/>
            </View>

            <View style={styles.screenHeadingView}>
                <Text style={styles.screenHeadingText}>BlockEd PROFILE</Text>
            </View>

            <View style={styles.screenHeadingView}>
                <Text style={styles.MySettings}>My Settings</Text>
            </View>

            {/* <View style={styles.ImageQrView}>
                <Image style={styles.Qrcode} source={ImageQr} resizeMode="stretch"/>
            </View> */}

<View style={styles.ImageQrView}>

<QRCode  
          value={qr}
          size={250}
        />

</View>
            <View style={{ ...Styles.formElement }}>
                <TextInput placeholder="Name" editable={false} textContentType="emailAddress" value={name} style={{...Styles.Input}}/>
            </View>

            <View style={{ ...Styles.formElement }}>
                <TextInput placeholder="Contact No" editable={false} textContentType="emailAddress" value={Number} style={{...Styles.Input}}/>
            </View>

            <View style={{ ...Styles.formElement }}>
                <TextInput placeholder="Email" editable={false} textContentType="emailAddress" value={email} style={{...Styles.Input}}/>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:10,height:50,borderRadius:5,marginHorizontal:20,marginBottom:5}}>
                <Text style={{fontFamily:"Sansation_Bold"}} >Push Notification</Text>


                <Switch
                    trackColor={{ false: "#CCC", true: "green" }}
                    thumbColor={isEnabled ? "white" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />

            </View>


            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:30,height:50,borderRadius:5,marginHorizontal:20,marginBottom:25}}>
                

{/* 
                handleNavigation('MySettings')

*/}
                <TouchableOpacity onPress={ () => {}}  style={{backgroundColor:'white',width:60,height:50,justifyContent:'center',alignItems:'center'}}>
                    <Image source={zoom} style={{width:35,height:35}}/>
                </TouchableOpacity>

{/* 
                handleNavigation('MySettings')

*/}
                <TouchableOpacity  onPress={ () => {}} style={{backgroundColor:'white',width:60,height:50,justifyContent:'center',alignItems:'center'}}>
                    <Image source={Gclassroom} style={{width:25,height:25}}/>
                </TouchableOpacity>
{/* 
                handleNavigation('MySettings')

*/}
                <TouchableOpacity  onPress={ () => {}} style={{backgroundColor:'white',width:60,height:50,justifyContent:'center',alignItems:'center'}}>
                    <Image source={fb} style={{width:25,height:25}}/>
                </TouchableOpacity>

                


                {/* 
                handleNavigation('MySettings')
                
                */}
                <TouchableOpacity  onPress={ () => {}} style={{backgroundColor:'white',width:60,height:50,justifyContent:'center',alignItems:'center'}}>
                    <Image source={insta} style={{width:25,height:25}}/>
                </TouchableOpacity>


            </View>


            

        </ScreenContainer>
    )
  }

  export default MySettings;