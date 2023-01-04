import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  StatusBar
} from "react-native";
import ImageLandingPageAccountType from "../../assets/images/landing_page_account_type.png";
import ShadowImageLandingPage from "../../assets/images/shadow_landing_page.png";
import ImageAsStudentButton from "../../assets/images/button_as_a_student.png";
import ImageAsTeacherButton from "../../assets/images/button_as_a_teacher.png";
import ScreenContainer from "../../components/ScreenContainer";
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import Styles from "../../common/Styles";
import Constants from "../../common/Constants.json";
import ChooseLanguage from "../../components/ChooseLanguage"
import { useDispatch, useSelector } from "react-redux";
import { setUserMode } from "../../redux/actionCreator";

const CreateAccount = ({ navigation }) => {
  const [openModel , setOpenModel] = React.useState(false);

  const dispatch = useDispatch()
  const {generalReducer} = useSelector(state => state)

  function CreateAccountasStudent() {
    // navigation.push("CreateAccountasStudent");
    dispatch(setUserMode("student"))
    navigation.navigate("SocialLogin1");

  }

  function CreateAccountasTeacher() {
    dispatch(setUserMode("teacher"))
    navigation.navigate("SocialLogin1");
  }


  return <ScreenContainer  COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
 
  
    <View style={{ flexDirection: "row-reverse", position:'relative', top:10 }}>
      <TouchableOpacity onPress={ () => {setOpenModel(!openModel)}}  style={{ marginRight: 20, padding: 2 }}>
        <Text style={{fontSize:16,fontFamily:"Sansation_Bold",color:'#010169', fontWeight:'bold'}}>Choose Language</Text>
      </TouchableOpacity>
    </View>


    {openModel == true ? 
          <>
          <ChooseLanguage openModel={true} />
          </> 
    
        : null}


    <HeaderAuthScreen />

    <View style={{ alignItems: "center", height: 280, marginTop: 10 }}>
      <Image source={ImageLandingPageAccountType} resizeMode="contain" style={{zIndex:1}} />
      <Image source={ShadowImageLandingPage} resizeMode="contain" style={{position: 'relative', bottom: 12}} />
    </View>

    <View style={{ alignItems: "center", paddingBottom: 20, marginLeft: "10%", marginRight: "10%", width: "80%" }}>

      <View style={{ marginTop: 5, justifyContent: "center", alignItems: "center", alignContent: "center" }}>
        <Text style={{...Styles.registerScreensSubtitleTextHeadingStyle2, textAlign: "center", }}>CREATE ACCOUNT</Text>
        <Text style={{ fontFamily:'Sansation_Regular', textAlign: "center", marginTop: 10, fontSize:15 }}>Please click if you would like to sign{'\n'} up<Text style={{fontWeight: 'bold'}}> as a Student Or as a Teacher</Text></Text>
      </View>

     
      <TouchableOpacity
       

       style={{...Styles.LandingButton,marginBottom:15,marginTop: 20,backgroundColor: "#3FB65F" }}
      
              onPress={CreateAccountasStudent}
             
            >
              <Text style={{...Styles.LandingButtonFont, color:'#FFFFFF', textAlign: "center", }}>AS A STUDENT</Text>
            </TouchableOpacity>
      
      

        
 <TouchableOpacity
       
       style={{...Styles.LandingButton,backgroundColor:'#FFFFFF', borderWidth:1,borderColor:'#3FB65F' }}


        onPress={CreateAccountasTeacher}
       
      >
        <Text style={{...Styles.LandingButtonFont, color:'#3FB65F', textAlign: "center", }}>AS A TEACHER</Text>
      </TouchableOpacity>

      
    
     
    </View>

  </ScreenContainer>
};

export default CreateAccount;
