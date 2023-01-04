import React , {Componet, useEffect,useState} from 'react';
import { View , Text , StyleSheet , TextInput , TouchableOpacity} from 'react-native';
import ScreenContainer from "../../components/ScreenContainer";
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorageCommunity from "@react-native-community/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
        GoogleSignin,
        statusCodes,
} from '@react-native-community/google-signin';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setLogOutMode, setSignInMode, setSignUpMode } from '../../redux/actionCreator';


const TeacherDashboard = (props) => {
        console.log(props.route.params.generalReducer);

   const [selectedMenuItem , setMenuItem ] = React.useState('');
   const dispatch = useDispatch()
 const {generalReducer} = useSelector(state => state)


   const handleNavigation =  (nextScreen) => {
        props.navigation.navigate(nextScreen);

}


useEffect(() => {

               
        AsyncStorageCommunity.setItem('userInfo',JSON.stringify(generalReducer));
       // AsyncStorageCommunity.setItem('orderStatus', props.route.params.generalReducer)
      
}, []);

const onPressLogout = async () => {

        // alert("logout")
        const isGoogle = await AsyncStorageCommunity.getItem('userFromGoogle');
        const isFacebook = await AsyncStorageCommunity.getItem('userFromFacebook');
        console.log("checker",{isGoogle,isFacebook})
        //GoogleSignin.configure({});
        try {
                if(isGoogle){
                        await GoogleSignin.revokeAccess();
                        await GoogleSignin.signOut();
                }
                if(isFacebook){
                        // LoginManager.logOut()
                        let logout =
                        new GraphRequest(
                                "me/permissions/",
                                {
                                // accessToken: accessToken,
                                httpMethod: 'DELETE'
                                },
                                (error, result) => {
                                if (error) {
                                        console.log('Error fetching data: ' + error.toString());
                                } else {
                                        LoginManager.logOut();
                                }
                                });
                        new GraphRequestManager().addRequest(logout).start();
                }
                await AsyncStorageCommunity.clear();
                dispatch(setLogOutMode(true))
                dispatch(setSignUpMode(false))
                dispatch(setSignInMode(false))
                dispatch(setAuthToken(''))
                props.navigation.navigate('CreateAccountOrSignIn')
        } catch (error) {
                console.error("error in google or fb SIGNOUT",error);
        }
        
}

    return(
        <ScreenContainer  COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
           
           
            <View style={{marginTop:15}}>
                <HeaderAuthScreen />
            </View>

    <TouchableOpacity onPress={ () => {console.log('searchIsPress')}} style={{flexDirection:'row',borderWidth:0,backgroundColor:'white',marginHorizontal:20,borderRadius:5,height:60,marginVertical:10,padding:10,alignItems:'center'}}>

            <Fontisto name="search" size={20} color="black" style={{paddingRight:10}}/>
            <TextInput 
                  placeholderTextColor = "black"  
                  placeholder="SEARCH MY STUDENTS "
                  underlineColorAndroid = "transparent"
                  style={{borderWidth:0,flex:1}}
                // ,borderRadius:5,marginHorizontal:20,marginVkkdfkkdertical:10,paddingHorizontal:10,height:60,backgroundColor:'white'}}
                />

            <MaterialCommunityIcons name="microphone-outline" size={30} color="black" style={{paddingRight:10}}/>

        </TouchableOpacity>


        <TouchableOpacity  onPress={ () =>{
                setMenuItem('myclasses')
                handleNavigation('MyClasses')


        }} style={{backgroundColor: selectedMenuItem == "myclasses"?'green':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "myclasses"?'white':'black',fontSize:16,fontWeight:'bold'}}>Google Classroom</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={ () =>{
                setMenuItem('mycalander')
                handleNavigation('TodayAppointment');


        }} style={{backgroundColor: selectedMenuItem == "mycalander"?'green':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "mycalander"?'white':'black',fontSize:16,fontWeight:'bold'}}>My Calander</Text>
        </TouchableOpacity>




{/* 
        <TouchableOpacity onPress={ () =>{
                setMenuItem('mystudent')
        }} style={{ backgroundColor: selectedMenuItem == "mystudent"?'green':'transparent',marginHorizontal:5,marginTop:10,borderRadius:25,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "mystudent"?'white':'black',fontSize:16,fontWeight:'bold'}}>My Students</Text>
        </TouchableOpacity> */}


        <TouchableOpacity onPress={ () =>{ 
                setMenuItem('wallet')
                handleNavigation('WalletScreenOne');

                
        }} style={{backgroundColor: selectedMenuItem == "wallet"?'green':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "wallet"?'white':'black',fontSize:16,fontWeight:'bold'}}>Block Ed Wallet</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={ () =>{
                setMenuItem('profile')
                handleNavigation('MySettings')


        }} style={{backgroundColor: selectedMenuItem == "profile"?'green':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "profile"?'white':'black',fontSize:16,fontWeight:'bold'}}>My Profile</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={ () =>{
                setMenuItem('messages')
                handleNavigation('MyMessages')

        }} style={{backgroundColor: selectedMenuItem == "messages"?'green':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "messages"?'white':'black',fontSize:16,fontWeight:'bold'}}>Messages</Text>
        </TouchableOpacity>


        <TouchableOpacity
         onPress={
                
                 onPressLogout} 
         style={{backgroundColor: selectedMenuItem == "logout"?'green':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "logout"?'white':'black',fontSize:16,fontWeight:'bold'}}>Logout</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={ () =>{
                setMenuItem('logout'),
                onPressLogout

        }} style={{backgroundColor: selectedMenuItem == "logout"?'green':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "logout"?'white':'black',fontSize:16,fontWeight:'bold'}}>Logout</Text>
        </TouchableOpacity> */}

        {/* <LinearGradient  colors={['#00A86B', '#2C786C', '#00A86B']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
</LinearGradient> */}
    



        </ScreenContainer>
    );

} 


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'red'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
})





export default TeacherDashboard;