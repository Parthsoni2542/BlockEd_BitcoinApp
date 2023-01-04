import React, { useEffect, useRef ,useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import AsyncStorageCommunity from "@react-native-community/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';




import {
  Input,
} from 'react-native-elements';

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
import { useDispatch, useSelector } from "react-redux";
import { setEmailFromScoial1, setFirstNameFromScoial1, setLastNameFromScoial1, setPhoneNumber, setProfileFromScoial1 } from "../../redux/actionCreator";
import { ActivityIndicator } from "react-native";
import Common from "../../common/Common";

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
    {value: " ", label: " "},
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
    email: 'nsadaj@gmail.com',
    password: 'Maria***888'
}

function CreateAccountasStudent(props) {

    const dispatch = useDispatch()
    const {generalReducer} = useSelector(state => state)

    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef(null);


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [dob , setDob] = useState('Date of Birth');
    const [gender , setGender] = useState('');
    const [DOBForPayload ,setDOBForPayload] = useState('');
    const [countryCodes, setCountryCodes] = useState(codes)
    const [selectedCode, setSelectedCode] = useState()
    const [formData, setFormData] = useState(initialFormData)

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("type of date", date)
        var datum = Date.parse(date);
        console.log("to timestamo",datum/1000)
        setDob(`${date.getDate()} ${monthShortNames[date.getMonth()]} ${date.getFullYear()}`)
        setDOBForPayload(datum/1000)
        hideDatePicker();
      };


    useEffect(()=>{
        // getUser on the basis of social login 
        async function getUser(){
            const checkFB = await AsyncStorageCommunity.getItem('userFromFacebook') 
            const checkGoogle = await AsyncStorageCommunity.getItem('userFromGoogle') 
            console.log("user from fb and google",{checkFB,checkGoogle:JSON.parse(checkGoogle).id})
            if(checkGoogle){
            
            await AsyncStorageCommunity.getItem('userFromGoogle')
            .then(res=>{
                const user = JSON.parse(res);
                console.log('inside',user);
                setFormData({
                    ...formData,
                    firstName:user.givenName,
                    lastName:user.familyName,
                    email:user.email,
                    userIdByGoogle:user.id
                })
            })
        }
        }
        getUser()
    },[])

    const [type , settype ] = useState(generalReducer.userMode)

    const [isLoading, setIsLoading] = useState(false);

    const [agreementCheck, setAgreementCheck] = React.useState(false);

    async function onPressSubmit() {
        // if(phoneInput.current.state.formattedNumber.length>8)
        // {
        //     alert("Present")
        // }
        // else{
        //     alert("NPresent")
        // }
        setIsLoading(true)
        const { firstName, lastName, phone, country, email, password, userIdByGoogle } = formData

        //checking that every field is filled
        if(!firstName || !lastName ){
            setIsLoading(false)
            Common.showSnackbar("Full Name Is required!", "info")
            return
        }
        else if (phoneInput.current.state.formattedNumber.length<8)
        {
            setIsLoading(false)
            Common.showSnackbar("Phone No Is Required", "info")
            return
        }
        else if (!country || (country.length==1))
        {
            setIsLoading(false)
            Common.showSnackbar("Country Is Required", "info")
            return
        }
        else if (!gender)
        {
            setIsLoading(false)
            Common.showSnackbar("Gender Is Required", "info")
            return
        }
        else if (!DOBForPayload )
        {
            setIsLoading(false)
            Common.showSnackbar("Date Of Birth Is Required", "info")
            return
        }
       
        else if ( !userIdByGoogle || !email )
        {
            setIsLoading(false)
            Common.showSnackbar("Email Is Required", "info")
            return
        }

        //getting roleId for register endpoint on the basis of account type i.e teacher or student.
        let roleId
        const resultOfroleApi = await ApiCalls.createGetRequest(endPoints.roles)
        console.log("roles api res",resultOfroleApi)
        if(type=="teacher"){
            let teacherRole = resultOfroleApi.data.data.filter(role => role.name == "teacher")
            roleId = teacherRole[0]._id
            console.log("roleIds processed",{teacherRole, roleId})
        }else{
            let studentRole = resultOfroleApi.data.data.filter(role => role.name == "student")
            roleId = studentRole[0]._id
            console.log("roleIds processed",{studentRole, roleId})
        }

  
    // let payload = {
      
    //         email,
    //     password,
    //     phone: phoneInput.current.state.formattedNumber,
    //     roleId,
    //     appsChannelKey:'d0b9465d852a16e4ce97586e69ede763',
    //     deviceIds:[ DeviceInfo.getUniqueId() ],
    //     socialAcc:[props.route.params.socialAccIdForGoogle],
    //     profile:{
    //         firstName,
    //         lastName,
    //         gender,
    //         dob:DOBForPayload,
    //         country
    //     }
               
               

    // }
    // console.log("Data",payload)

    // // hitting the register endpoint for signup
    // const result = await ApiCalls.createPostRequest(endPoints.registerUser,payload)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTJkMDExOGYyMDVlMDAxNzY0OTA2MCIsImlhdCI6MTYxMjkzNTEzMiwiZXhwIjoxNjE1NTI3MTMyfQ.5C2IlvsSWLiIguBkFW5cc3K-HBQGyP0wA2wxYLhFM5c");
    
    var raw = JSON.stringify({
     
            email,
        password,
        phone: phoneInput.current.state.formattedNumber,
        roleId,
        appsChannelKey:'d0b9465d852a16e4ce97586e69ede763',
        deviceIds:[ DeviceInfo.getUniqueId() ],
        socialAcc:[props.route.params.socialAccIdForGoogle],
        profile:{
            firstName,
            lastName,
            gender,
            dob:DOBForPayload,
            country
        }
               
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://hopeaccelerated-backend.herokuapp.com/api/v1/auth/register", requestOptions)
      .then(response => response.json())
      .then(result => 
       { 
        setIsLoading(false)


   
         if(result.success){
            setIsLoading(false)
            console.log("in success",result)
            dispatch(setEmailFromScoial1(email))
            dispatch(setPhoneNumber(phoneInput.current.state.formattedNumber))
            dispatch(setFirstNameFromScoial1(firstName))
            dispatch(setLastNameFromScoial1(lastName))
            dispatch(setProfileFromScoial1({
                firstName,
                lastName,
                gender,
                dob:DOBForPayload,
                country,
            }))

            
            props.navigation.navigate('PhoneVerificationScreen');

       
    }else{
        setIsLoading(false)
        // alert("Please Recheck Info Again");
        console.log("Reas", result)

       Common.showSnackbar("An account with this Email or phone number is already exists", "error")
        return
    }
}
     )
    .catch(error => console.log('error', error));

      }

    const { firstName, lastName, phone, country, email, password } = formData

return (
    <ScreenContainer  COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
    
    <HeaderAuthScreen />
        <ScreenHeadingTextBox headingText="Sign Up"/>

        <ScreenDetailsTextBox text={`Please fill below to create a new ${'\n'} account`} />

      
         
        
        


        <View style={{ ...Styles.formElement, marginTop:10 }} >
            <TextInput  
                underlineColorAndroid="transparent" 
                placeholder="FIRST NAME" 
                textContentType="name" 
                value={firstName} 
                onChangeText={text=>setFormData({...formData,'firstName':text})}
                style={{...Styles.Input}} />
        </View>

        <View style={{ ...Styles.formElement }} >
            <TextInput 
                placeholder="LAST NAME" 
                textContentType="name" 
                value={lastName}
                onChangeText={text=>setFormData({...formData,'lastName':text})}
                style={{...Styles.Input}} />
        </View>

        <View style={styles.numberContainer}>
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
            flagStyle={{marginLeft:5, marginRight:5}}
            withDarkTheme
            // withShadow
            autoFocus
             textInputStyle={{backgroundColor:'white'}}
             containerStyle={{color:'white'}}
          />
          </View>
         

       

        <View style={{ ...Styles.formElement }} >
            <TextInput 
                placeholder="Country" 
                textContentType="name" 
                value={country}
                onChangeText={(text)=>setFormData({...formData,'country':text})}
                style={{...Styles.Input, zIndex:9}} />
        </View>

        <View style={{ ...Styles.formElement }}>
            <TextInput 
                placeholder="EMAIL"
                textContentType="emailAddress"
                value={email}
                editable={false}
                onChangeText={(text)=>setFormData({...formData,'email':text})}
                style={{...Styles.Input}}/>
        </View>

        {/* <View style={{ ...Styles.formElement,}}>
            <TextInput 
                placeholder="PASSWORD" 
                secureTextEntry={true}
                textContentType="name" 
                value={password}
                onChangeText={text=>setFormData({...formData,'password':text})}
                style={{...Styles.Input}}/>
        </View> */}

        <View style={styles.genderInfo }>
            <Text style={styles.txt}>Provide Your Gender </Text>
            <View style={styles.genderBtnRow }>



                    {gender=="male"?
                        <TouchableOpacity onPress={ ()=>setGender('male')} style={styles.btn}>
                            <Text style={{color:'white',alignSelf:'center',fontWeight:'bold'}}>Male</Text>
                        </TouchableOpacity>

                        :
                        <TouchableOpacity onPress={ ()=>setGender('male')} style={styles.btn2}>
                            <Text style={{color:'black',alignSelf:'center',fontWeight:'bold'}}>Male</Text>
                        </TouchableOpacity>

                    }


                    {gender=="female"?
                        <TouchableOpacity onPress={ ()=>setGender('female')} style={styles.btn}>
                                <Text style={{color:'white',alignSelf:'center',fontWeight:'bold'}}>female</Text>
                        </TouchableOpacity>

                                :
                        <TouchableOpacity onPress={ ()=>setGender('female')} style={styles.btn2}>
                                <Text style={{color:'black',alignSelf:'center',fontWeight:'bold'}}>female</Text>
                        </TouchableOpacity>

                    }


            </View>
       </View>

        <View style={styles.dobInfo}>

            
            <TouchableOpacity onPress={ ()=>{showDatePicker()}} style={styles.btn3}>
                <Text style={styles.txt2}>{dob}</Text>
                <AntDesign name="calendar" size={15} color="black" />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </TouchableOpacity>


        </View>

        <View style={{ flexDirection: "row", alignItems: "center", width: "90%", marginLeft: "4%", marginRight: "5%" }}>
            <CheckBox
                value={agreementCheck}
                onValueChange={setAgreementCheck.bind(null, !agreementCheck)} />
            <Text style={{fontFamily:"Sansation_Regular"}} onPress={setAgreementCheck.bind(null, !agreementCheck)}>{`I Agree to the Terms & Conditions`}</Text>
        </View>

        <View>
        {isLoading?
                    <ActivityIndicator size="large" color="#3FB65F" />
                    :
                    <TouchableOpacity
       
                    onPress={
                        
                      
                     onPressSubmit
                    }
                    style={{...Styles.LandingButton,marginBottom:15,width:'85%', alignSelf:'center',marginTop:10,backgroundColor: "#3FB65F" }}
                   
                           
                          
                         >
                           <Text style={{...Styles.LandingButtonFont, color:'#FFFFFF', textAlign: "center", }}>SUBMIT</Text>
                         </TouchableOpacity>
                    // <TouchableOpacity 
            //     style={{...Styles.submit_btn}}
            //     onPress={onPressSubmit}>
            //     <Image resizeMode="stretch" source={submit_btn} />
            // </TouchableOpacity>
       
       }
        </View>
        </ScreenContainer>    
    )
};
// let myCountryPicker; 
// let phone;

// let codes = [
//     {label: '+1 USA', value: '+1'},
//     {label: '+1 CANADA', value: '+1'},
//     {label: '+23 UK', value: '+23'},
//     {label: '+92 Rusia', value: '+92'},
//     {label: '+32 Spain', value: '+32'},
// ]
 
// let reverseCodes = [
//     {value: " ", label: " "},
//     {value: '+1 CANADA', label: '+1'},
//     {value: '+23 UK', label: '+23'},
//     {value: '+92 Rusia', label: '+92'},
//     {value: '+32 Spain', label: '+32'},
// ]


// let monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
// "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];


// let initialFormData = {
//     firstName: '',
//     lastName: '',
//     phone: '',
//     country: '',
//     email: 'neelum.rajo@gmail.com',
//     password: ''
// }

// function CreateAccountasStudent(props) {




//     const dispatch = useDispatch()
//     const {generalReducer} = useSelector(state => state)
//     const [value, setValue] = useState("");
//     const [formattedValue, setFormattedValue] = useState("");
//     const phoneInput = useRef(null);






    

//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
//     const [dob , setDob] = useState('Date of Birth');
//     const [gender , setGender] = useState('');
//     const [DOBForPayload ,setDOBForPayload] = useState('');
//     const [countryCodes, setCountryCodes] = useState(codes)
//     const [selectedCode, setSelectedCode] = useState(6)
//     const [formData, setFormData] = useState(initialFormData)
 

//     const showDatePicker = () => {
//         setDatePickerVisibility(true);
//     };

//     const hideDatePicker = () => {
//         setDatePickerVisibility(false);
//     };

//     const handleConfirm = (date) => {
//         console.log("type of date", date)
//         var datum = Date.parse(date);
//         console.log("to timestamo",datum/1000)
//         setDob(`${date.getDate()} ${monthShortNames[date.getMonth()]} ${date.getFullYear()}`)
//         setDOBForPayload(datum/1000)
//         hideDatePicker();
//       };


//     useEffect(()=>{
//         // getUser on the basis of social login 
//         async function getUser(){
//             const checkFB = await AsyncStorageCommunity.getItem('userFromFacebook') 
//             const checkGoogle = await AsyncStorageCommunity.getItem('userFromGoogle') 
//             console.log("user from fb and google",{checkFB,checkGoogle:JSON.parse(checkGoogle).id})
//             if(checkGoogle){
            
//             await AsyncStorageCommunity.getItem('userFromGoogle')
//             .then(res=>{
//                 const user = JSON.parse(res);
//                 console.log('inside',user);
//                 setFormData({
//                     ...formData,
//                     firstName:user.givenName,
//                     lastName:user.familyName,
//                   //  email:user.email,
//                   email:'neelum.rajo@gmail.com',
//                     userIdByGoogle:user.id
//                 })
//             })
//         }
//         }
//         getUser()
//     },[])

//     const [type , settype ] = useState(generalReducer.userMode)

//     const [isLoading, setIsLoading] = useState(false);

//     const [agreementCheck, setAgreementCheck] = React.useState(false);

//     async function onPressSubmit() { 
//         setIsLoading(true)
//         const { firstName, lastName, phone, country, email, password, userIdByGoogle } = formData

//         //checking that every field is filled
//         if(!firstName || !lastName){
//             setIsLoading(false)
//             Common.showSnackbar("Full name is required!", "info")
//             return
//         }

//         console.log("PHone",value, formattedValue)

//         // if(!phone){
//         //     setIsLoading(false)
//         //     Common.showSnackbar("Phone No is required!", "info")
//         //     return
//         // }


//         if(!country || (country.length==1) || !email || !password || !selectedCode || !DOBForPayload || !gender || !userIdByGoogle){
//             setIsLoading(false)
//             Common.showSnackbar("All fields are required!", "info")
//             return
//         }







//         //getting roleId for register endpoint on the basis of account type i.e teacher or student.
//         let roleId
//         const resultOfroleApi = await ApiCalls.createGetRequest(endPoints.roles)
//         console.log("roles api res",resultOfroleApi)
//         if(type=="teacher"){
//             let teacherRole = resultOfroleApi.data.data.filter(role => role.name == "teacher")
//             roleId = teacherRole[0]._id
//             console.log("roleIds processed",{teacherRole, roleId})
//         }else{
//             let studentRole = resultOfroleApi.data.data.filter(role => role.name == "student")
//             roleId = studentRole[0]._id
//             console.log("roleIds processed",{studentRole, roleId})
//         }

//     // setting payload for register endpoint
//     let payload = {
//         email,
//         password,
//       phone:formattedValue,
//       //  phone: selectedCode+phone,
//         roleId,
//         appsChannelKey:'d0b9465d852a16e4ce97586e69ede763',
//         deviceIds:[ DeviceInfo.getUniqueId() ],
//         socialAcc:[props.route.params.socialAccIdForGoogle],
//         profile:{
//             firstName,
//             lastName,
//             gender,
//             dob:DOBForPayload,
//             country,
//         }
//     }

//     // hitting the register endpoint for signup
//     const result = await ApiCalls.createPostRequest(endPoints.registerUser,payload)

//     if(result.status==200){
//         if(result.data.success){
//             console.log("in success")
//            // dispatch(setEmailFromScoial1(email))
//            dispatch(setEmailFromScoial1("neelum.rajo@gmail.com"))
//             dispatch(setPhoneNumber(selectedCode+phone))
//             dispatch(setFirstNameFromScoial1(firstName))
//             dispatch(setLastNameFromScoial1(lastName))
//             dispatch(setProfileFromScoial1({
//                 firstName,
//                 lastName,
//                 gender,
//                 dob:DOBForPayload,
//                 country,
//             }))

//             setIsLoading(false)
//             props.navigation.navigate('PhoneVerificationScreen');

//         }
//     }else{
//         setIsLoading(false)

//         Common.showSnackbar("An account with this Email or phone number is already exists", "error")
//         return
//     }

//       }

//     const { firstName, lastName, phone, country, email, password } = formData

// return (
//     <ScreenContainer  COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
    
//     <HeaderAuthScreen />


   
//         <ScreenHeadingTextBox headingText="Sign Up"/>

//         <ScreenDetailsTextBox text={`Please fill below to create a new ${'\n'} account`} />

//         <View style={{ ...Styles.formElement, marginTop:10 }} >
//             <TextInput  
//                 underlineColorAndroid="transparent" 
//                 placeholder="FIRST NAME" 
//                 textContentType="name" 
//                 value={firstName} 
//                 onChangeText={text=>setFormData({...formData,'firstName':text})}
//                 style={{...Styles.Input}} />
//         </View>

//         <View style={{ ...Styles.formElement }} >
//             <TextInput 
//                 placeholder="LAST NAME" 
//                 textContentType="name" 
//                 value={lastName}
//                 onChangeText={text=>setFormData({...formData,'lastName':text})}
//                 style={{...Styles.Input}} />
//         </View>

//          {/* <View style={{ ...Styles.formElement }} >

//             <DropDownPicker
//                 items={reverseCodes}
//                 defaultValue={" "}
//                 value={reverseCodes}
//                 containerStyle={{height: 50, width:'21%',paddingLeft:0,marginHorizontal:'3%',marginLeft:0,}}
//                 style={{backgroundColor: '#ffffff'}}
//                 itemStyle={{
//                     justifyContent: 'flex-start'
//                 }}
//                 dropDownStyle={{backgroundColor: '#ffffff',marginTop:7,width:'170%'}}
//                 onChangeItem={item => setSelectedCode(item.label)}
//             />
//             <TextInput 
//                 placeholder="PHONE NUMBER" 
//                 keyboardType = 'numeric' 
//                 textContentType="telephoneNumber" 
//                 value={phone} 
//                 onChangeText={(text)=>setFormData({...formData,'phone':text})}
//                 style={{...Styles.Input, width:'65%',marginLeft:0,marginHorizontal:0}} 
//             />
//         </View>  */}


//         <View style={styles.numberContainer}>
         
//             <PhoneInput
//      // ref={phoneInput}
     
//             flagStyle={{marginLeft:5, marginRight:5}}
//          textProps={{placeholder: 'Phone Number'}}
//             defaultValue={value}
          
//              defaultCode="DM"
//             onChangeText={(text) => {
//               setValue(text);
//             console.log("PH",value)
           

//             }}
//             onChangeFormattedText={(text) => {
//               setFormattedValue(text);
//               console.log("PH",formattedValue);
//             }}
//              withDarkTheme
//             // // withShadow
//              autoFocus
//             // // textInputStyle={{backgroundColor:'white'}}
//             // // containerStyle={{color:'white'}}
//           />
          
    
//         </View>
      
        
        
     
     
       




        
     


//         <View style={{ ...Styles.formElement }} >
//             <TextInput 
//                 placeholder="Country" 
//                 textContentType="name" 
//                 value={country}
//                 onChangeText={(text)=>setFormData({...formData,'country':text})}
//                 style={{...Styles.Input, zIndex:9}} />
//         </View>

//         <View style={{ ...Styles.formElement }}>
//             <TextInput 
//                 placeholder="EMAIL"
//                 textContentType="emailAddress"
//                 value={email}
//                 onChangeText={(text)=>setFormData({...formData,'email':text})}
//                 style={{...Styles.Input}}/>
//         </View>

//         <View style={{ ...Styles.formElement,}}>
//             <TextInput 
//                 placeholder="PASSWORD" 
//                 secureTextEntry={true}
//                 textContentType="name" 
//                 value={password}
//                 onChangeText={text=>setFormData({...formData,'password':text})}
//                 style={{...Styles.Input}}/>
//         </View>

//         <View style={{ ...Styles.formElement }} >
//         <View style={styles.genderInfo}>
//             <Text style={styles.txt}>What is your Gender</Text>
//             <View style={styles.genderBtnRow}>



//                     {gender=="male"?
//                         <TouchableOpacity onPress={ ()=>setGender('male')} style={styles.btn}>
//                             <Text style={{color:'white',fontWeight:'bold'}}>Male</Text>
//                         </TouchableOpacity>

//                         :
//                         <TouchableOpacity onPress={ ()=>setGender('male')} style={styles.btn2}>
//                             <Text style={{color:'black',fontWeight:'bold'}}>Male</Text>
//                         </TouchableOpacity>

//                     }


//                     {gender=="female"?
//                         <TouchableOpacity onPress={ ()=>setGender('female')} style={styles.btn}>
//                                 <Text style={{color:'white',fontWeight:'bold'}}>Female</Text>
//                         </TouchableOpacity>

//                                 :
//                         <TouchableOpacity onPress={ ()=>setGender('female')} style={styles.btn2}>
//                                 <Text style={{color:'black',fontWeight:'bold'}}>Female</Text>
//                         </TouchableOpacity>

//                     }


//             </View>
//        </View>
//        </View>

//         <View style={styles.dobInfo}>

            
//             <TouchableOpacity onPress={ ()=>{showDatePicker()}} style={styles.btn3}>
//                 <Text style={styles.txt2}>{dob}</Text>
//                 <AntDesign name="calendar" size={15} color="black" />
//                 <DateTimePickerModal
//                     isVisible={isDatePickerVisible}
//                     mode="date"
//                     onConfirm={handleConfirm}
//                     onCancel={hideDatePicker}
//                 />
//             </TouchableOpacity>


//         </View>

//         <View style={{ flexDirection: "row", alignItems: "center", width: "90%", marginLeft: "4%", marginRight: "5%" }}>
//             <CheckBox
//                 value={agreementCheck}
//                 onValueChange={setAgreementCheck.bind(null, !agreementCheck)} />
//             <Text style={{fontFamily:"Sansation_Regular"}} onPress={setAgreementCheck.bind(null, !agreementCheck)}>{`I Agree to the Terms & Conditions`}</Text>
//         </View>

//         <View>
//         {isLoading?
//                     <ActivityIndicator size="large" color="#3FB65F" />
//                     :
//                     <TouchableOpacity
       

//                     style={{...Styles.LandingButton,width:'90%',alignSelf:'center',marginBottom:15,marginTop: 20,backgroundColor: "#3FB65F" }}
                   
//                     onPress={onPressSubmit}>
                          
//                            <Text style={{...Styles.LandingButtonFont, color:'#FFFFFF', textAlign: "center", }}>SUBMIT</Text>
//                          </TouchableOpacity>
                
//         }
//         </View>
//         </ScreenContainer>    
//     )
// };


const styles = StyleSheet.create({
    txt2:{
        color:'black',
        fontSize:15,
        fontFamily:"Sansation_Regular",
    },
    btn3:{
        backgroundColor:'white',
        padding:20,
        borderRadius:5,
        width:'100%',
        marginVertical:15,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    txt:{
        fontSize:16,
        fontFamily:"Sansation_Bold",
    },
    dobInfo:{
        marginHorizontal:20,
        marginTop:10,

    },
    genderInfo:{
        marginHorizontal:30,
        marginTop:10,
        zIndex:-1

    },
    genderBtnRow:{
       flexDirection:'row',
        // borderWidth:1,
    width:'100%',
       alignSelf:'center',
        marginTop:10,
        justifyContent:'space-between',
       // alignItems:'center',
       alignContent:'center'
        // paddingHorizontal:20,
    },
    btn:{

      //  paddingHorizontal:80,
      width:'49%',
        paddingVertical:20,
        // borderWidth:1,
        borderRadius:5,
        backgroundColor:'#3FB65F',
        marginBottom:5,
        elevation:5,
        zIndex:-1

    },
    btn2:{
        width:'49%',
        //paddingHorizontal:80,
        paddingVertical:20,
        // borderWidth:1,
        borderRadius:5,
        backgroundColor:'white',
        elevation:5,
        marginBottom:5,
        zIndex:-1
    },
    numberContainer:{
       // marginTop:50,
       marginHorizontal:20,
        // borderWidth:1,
       // flexDirection: "row",
      
        backgroundColor:'white',
        height:50,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center',
      //  elevation:5
    }
})


export default CreateAccountasStudent;



