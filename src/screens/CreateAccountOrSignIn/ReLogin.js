import React, { useEffect, useRef ,useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import submit_btn from "../../assets/images/submit_btn.png";
import ScreenContainer from "../../components/ScreenContainer";
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import ScreenHeadingTextBox from '../../components/ScreenHeadingTextBox';
import ScreenDetailsTextBox from '../../components/ScreenDetailsTextBox';
import ApiCalls from '../../services/ApiCalls';
import {endPoints} from '../../services/ApiConstants'
import PhoneInput from 'react-native-phone-input';
import Styles from "../../common/Styles";
import CustomCountryPickerModal from '../../components/CustomCountryPickerModal';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
import DeviceInfo from 'react-native-device-info';

let myCountryPicker; 
let phone;

let codes = [
    {label: '+1 USA', value: '+1'},
    {label: '+1 CANADA', value: '+1'},
    {label: '+23 UK', value: '+23'},
    {label: '+92 Rusia', value: '+92'},
    {label: '+32 Spain', value: '+32'},
]
 
let reverseCodes = [
    {value: '+1 USA', label: '+1'},
    {value: '+1 CANADA', label: '+1'},
    {value: '+23 UK', label: '+23'},
    {value: '+92 Rusia', label: '+92'},
    {value: '+32 Spain', label: '+32'},
]


let monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


let initialFormData = {
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    email: '',
    password: ''
}

function ReLogin(props) {
    const [selectedCode, setSelectedCode] = useState()
    const [number, setNumber] = useState()



    async function onPressSubmit() { 

        if( !selectedCode || !number){
            alert('All fields are required!')
            return
        }

        let payload = {
          phone: selectedCode+number
        }

        console.log("payload", payload)

    const result = await ApiCalls.createPostRequest(endPoints.loginUserByNumber,payload)

    console.log("result-----",result)
        if(result.data.success){
            props.navigation.navigate('PhoneVerificationScreen');      
          }else{
            alert('Invalid Number')
          }
      }

    console.log("states of relogin -----> ",{selectedCode,number})


  return (
    <ScreenContainer  COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
    
    <HeaderAuthScreen />
        <ScreenHeadingTextBox headingText="WELCOME BACK!"/>

        <ScreenDetailsTextBox text="Fill in your account using" />

        <View style={{ ...Styles.formElement, marginTop:60, marginBottom:60 }} >

            <DropDownPicker
                items={reverseCodes}
                defaultValue={"+92 Rusia"}
                value={reverseCodes}
                containerStyle={{height: 50, width:'21%',paddingLeft:0,marginHorizontal:'3%',marginLeft:0,}}
                style={{backgroundColor: '#ffffff'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#ffffff',marginTop:7,width:'170%'}}
                onChangeItem={item => setSelectedCode(item.label)}
            />
            <TextInput 
                placeholder="MOBILE NUMBER"
                keyboardType = 'numeric' 
                textContentType="telephoneNumber" 
                value={phone} 
                onChangeText={(text)=>setNumber(text)}
                style={{...Styles.Input, width:'65%',marginLeft:0,marginHorizontal:0}} 
            />
        </View>


        <View>
            <TouchableOpacity 
                style={{...Styles.submit_btn, marginTop:60}}
                onPress={onPressSubmit}>
                <Image resizeMode="stretch" source={submit_btn} />
            </TouchableOpacity>
        </View>
        </ScreenContainer>    
    )
};

export default ReLogin;