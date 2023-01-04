import React , {Componet,useState,useEffect} from 'react';
import { View ,Keyboard, Text , StyleSheet , TextInput , Modal,Pressable,TouchableOpacity} from 'react-native';
import ScreenContainer from "../../components/ScreenContainerDashboard";
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import SearchBar from "../../components/SearchBar";
import AsyncStorageCommunity from "@react-native-community/async-storage";
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Voice from '@react-native-voice/voice';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Constants from '../../common/Constants.json';
import {
        GoogleSignin,
        statusCodes,
} from '@react-native-community/google-signin';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setLogOutMode, setSignInMode, setSignUpMode } from '../../redux/actionCreator';
import AsyncStorage from "./../../services/AsyncStorage";

const StudentDashboard = (props) => {
        console.log(props.route.params.generalReducer);
        const [serverData, setServerData] = useState([]);
//added for voice
const [isRecord, setIsRecord] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [texts, setTexts] = useState('');
  const buttonLabel = isRecord ? 'Stop' : 'Start';
  
    const voiceLabel = texts
    ? texts
    : isRecord
    ? ''
    : '';
const voiceButtonText = (texts === '' && !isRecord) ? 
    'Press Start Button'
    :(texts === '' && isRecord) ?
    'Say something...'
    :(texts !== '' && isRecord) ?
    'Press Stop Button' : 'Press Start Button'
const onSpeechStart = (event) => {
    console.log('onSpeechStart');
    setTexts('');
  };
  const onSpeechEnd = () => {
    setIsRecord(false)
    console.log('onSpeechEnd');
  };
  const onSpeechResults = (event) => {
    console.log(' onSpeechResults', event);
    console.log('onSpeechResults');
    setTexts(event.value[0]);
  };
  const onSpeechError = (event) => {
    console.log('onSpeechError');
    console.log(event.error);
  };
const onRecordVoice = () => {
    if (isRecord) {
      Voice.stop();
      setModalVisible(!modalVisible);
    } else {
      
      Voice.start('en-US'); // languages code e.g 'en-US'
    }
    setIsRecord(!isRecord);
  };
const onSpeechPartialResults = (event) => {
   
    console.log(event.value[0]);
    setTexts(event.value[0]);
    
  };
const onSpeechVolumeChanged = (event) => {
    //console.log('onSpeechVolumeChanged 3333');
    //console.log(event.value);
  };
useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged
return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
 
  //  Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
     
    //  Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidHide = () =>{
  // createPostRequest(text)
  //Keyboard.dismiss 
  console.log('Ia ma runnig now after dimsi')
  console.log('navvalue', texts)
  props.navigation.navigate('StudenViewAllCourseList', {SearchingText:texts});

  };




    

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
              //  console.log(Constants.BaseUrl)
             console.log('text', texts)
                
                fetch(Constants.BaseUrl +"/api/v1/coursesfeed?search="+texts, requestOptions)
                  .then(response => response.json())
                  .then(result => 
                    
                  {            
                      console.log("SearchedResult",result.data)   
                 setServerData(result.data)
              //  if(result.data.length > 0)
              //  {console.log(result.data.length)
              //    console.log('Greaster')
              //  }
             
                  
                }
                    )
                  .catch(error => console.log('error', error));
        
        
        
        
            }
        






        useEffect(() => {

               
                AsyncStorageCommunity.setItem('userInfo',JSON.stringify(generalReducer));
               // AsyncStorageCommunity.setItem('orderStatus', props.route.params.generalReducer)
               createPostRequest();     
        }, []);


        const [selectedMenuItem , setMenuItem ] = React.useState('');
        
        const dispatch = useDispatch()
        const {generalReducer} = useSelector(state => state)

        const handleNavigation =  (nextScreen) => {
                props.navigation.navigate(nextScreen);

        }

      

     
    
        const onPressLogout = async () => {

                // alert("logout")
                const isGoogle = await AsyncStorageCommunity.getItem('userFromGoogle');
                const isFacebook = await AsyncStorageCommunity.getItem('userFromFacebook');
                console.log("checker",{isGoogle,isFacebook})
                GoogleSignin.configure({});
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
                  props.navigation.navigate('CreateAccountOrSignIn')
                  // console.error("error in google or fb SIGNOUT",error);
                }
                
        }
    return(
        <ScreenContainer COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
           
           
            <View style={{marginTop:15}}>
                <HeaderAuthScreen />
            </View>
            <View  style={styles.container}>
            <Fontisto name="search" size={20} color="black" style={styles.searchIcon} />
         
            <SearchableDropdown
  onTextChange={text => {
    setTexts(text)
    console.log("texts", texts)
    console.log("text",text)
  
  }}
  //On text change listner on the searchable input

  onItemSelect={(item) => {

    props.navigation.navigate('StudentCourseView', { CourseData:item })
  
}
}

  containerStyle={{ padding: 5 }}
  //suggestion container style
  textInputStyle={{
    //inserted text style
  //  padding: 12,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // backgroundColor: '#FAF7F6',
  }}

 

  itemStyle={{
    //single dropdown item style
   padding: 7,

    marginTop: 2,
    backgroundColor: '#fff',
    borderColor: '#bbb',

  borderWidth: 0.2,
  borderRadius:5
  
  }}
  itemTextStyle={{
    //text style of a single dropdown item
    color: '#222',
  }}


  textInputProps={
    {
    //  placeholder: "placeholder",
      // underlineColorAndroid: "transparent",
      // style: {
      //     padding: 12,
      //     borderWidth: 1,
      //     borderColor: '#ccc',
      //     borderRadius: 5,
      // },
      onSubmitEditing: _keyboardDidHide,
      value:texts,
 
    }
  }

  itemsContainerStyle={{
    //items container style you can pass maxHeight
    //to restrict the items dropdown hieght
 //   maxHeight: '50%',
 
  }}
  items={serverData}
  //mapping of item array
  defaultIndex={2}
  //default selected item index
 

  placeholderTextColor = "black"  
  placeholder="SEARCH ALL COURSES"
  //place holder for the search input
  resetValue={false}
  //reset textInput Value with true and false state
  underlineColorAndroid="transparent"
  //To remove the underline from the android input
/>



            {/* <SearchableDropdown
        //   onTextChange={(text) =>
        //         console.log('Hii',text)
      

        // }

        textInputProps={
          {
          //  placeholder: "placeholder",
            // underlineColorAndroid: "transparent",
            // style: {
            //     padding: 12,
            //     borderWidth: 1,
            //     borderColor: '#ccc',
            //     borderRadius: 5,
            // },
            onSubmitEditing:Keyboard.dismiss,
            value:text,
            onTextChange: text => setText(text)
          }
        }
      
          //On text change listner on the searchable input
          onItemSelect={(item) => {
                props.navigation.navigate('StudentCourseView', { CourseData:item })
                // console.log(item)  
                // ,alert("HIi",JSON.stringify(item))
        }
        }
        
         
       
        
      
        /> */}
       
       <TouchableOpacity
      onPress={() => setModalVisible(true)}
      >
       
        

       <MaterialCommunityIcons name="microphone-outline" size={30} color="black" 
     style={styles.phoneIcon} />
     </TouchableOpacity>
           
           
            </View>


               

{/* 
        <TouchableOpacity  onPress={ () =>{
                setMenuItem('myclasses')
                handleNavigation('MyClasses')

        }} style={{backgroundColor: selectedMenuItem == "myclasses"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "myclasses"?'white':'black',fontSize:16,fontWeight:'bold'}}>My Classes</Text>
        </TouchableOpacity> */}



        <TouchableOpacity  onPress={ () =>{
                setMenuItem('lessons');
            
             //  handleNavigation('StudenViewAllCourseList', {SearchingText:'course'});


        }} style={{backgroundColor: selectedMenuItem == "lessons"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "lessons"?'white':'black',fontSize:16,fontWeight:'bold'}}>Lesson</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={ () =>{
                setMenuItem('myclassroom');
              //  handleNavigation('StudentCourseSearch');
              //  handleNavigation('StudentCourseView');
              // handleNavigation('StudenViewAllCourseList');


        }} style={{backgroundColor: selectedMenuItem == "myclassroom"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "myclassroom"?'white':'black',fontSize:16,fontWeight:'bold'}}>My Classroom</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={ () =>{
                setMenuItem('mycalander');
                handleNavigation('TodayAppointment');


        }} style={{backgroundColor: selectedMenuItem == "mycalander"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "mycalander"?'white':'black',fontSize:16,fontWeight:'bold'}}>My Calander</Text>
        </TouchableOpacity>





        <TouchableOpacity onPress={ () =>{
                setMenuItem('wallet');
                handleNavigation('WalletScreenOne');

        }} style={{backgroundColor: selectedMenuItem == "wallet"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:25,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "wallet"?'white':'black',fontSize:16,fontWeight:'bold'}}>Block Ed Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ () =>{
                setMenuItem('profile')
                handleNavigation('MySettings')

        }} style={{backgroundColor: selectedMenuItem == "profile"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "profile"?'white':'black',fontSize:16,fontWeight:'bold'}}>My Profile</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={ () =>{
                setMenuItem('messages')
                handleNavigation('MyMessages')

        }} style={{backgroundColor: selectedMenuItem == "messages"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "messages"?'white':'black',fontSize:16,fontWeight:'bold'}}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressLogout} style={{backgroundColor: selectedMenuItem == "logout"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                <Text style={{color:selectedMenuItem == "logout"?'white':'black',fontSize:16,fontWeight:'bold'}}>Logout</Text>
        </TouchableOpacity>

        {/* <LinearGradient  colors={['#00A86B', '#2C786C', '#00A86B']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
</LinearGradient> */}
    
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
<TouchableOpacity
          style={{position:'absolute',right:0,
          margin:15}}
      onPress={() => setModalVisible(false)}
      >

<MaterialCommunityIcons name="close-circle-outline" size={30} color="#ffff" 
      />
        
    
      </TouchableOpacity>
           
          <Text style={{color:'#ffff'}}>{voiceLabel}</Text>
<TouchableOpacity
          onPress={onRecordVoice}
        
        style={{
         
          marginTop:10
         
        }}>
        <Text style={{color:'#ffff', marginBottom:10}}>{buttonLabel}</Text>
        <MaterialCommunityIcons name="microphone-outline" size={30} color="#ffff" 
     style={styles.phoneIcon} />
      </TouchableOpacity>
      <Text style={{ color:'#ffff', marginTop:5}}>{voiceButtonText}</Text>
<Text style={{position:'absolute', bottom:15,color:'#ffff'}}>English (United States)
</Text>
          </View>
        </View>
      </Modal>


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
      //added by maria for testing
      titleText: {
       // padding: 8,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      headingText: {
        //padding: 8,
      },
      searchIcon:{
              marginTop:20,
              marginLeft:10,

       // paddingRight:10
    },

    phoneIcon:{
        marginTop:20,
       // paddingRight:10
       
    },
    container:{
         flexDirection:'row',
        // borderWidth:0,
      // justifyContent:'space-between',
         backgroundColor:'white',
        marginHorizontal:20,
         borderRadius:5,
         marginBottom:10,
        // height:60,
        // marginVertical:10,
        // padding:10,
       // alignItems:'center'
    },
    centeredView: {
        flex: 1,
       // justifyContent: "center",
        alignItems: "center",
        //marginTop: 22
    
      },
      modalView: {
        //margin: 20,
        backgroundColor: "#3FB65F",
       borderRadius: 10,
       maxHeight:'100%',
       padding: 35,
        paddingBottom:100,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        width:'100%',
        bottom:0,
        position:'absolute',
        alignItems: "center",
     
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
    });





export default StudentDashboard;