import React, { useState ,useRef} from 'react';
import {View , Text,StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import ScreenContainer from "../../components/ScreenContainer";
import PhoneInput from "react-native-phone-number-input";
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import {endPoints} from '../../services/ApiConstants'


const grades = [
    {label:'K-6', value:'K-6'},
    {label:'7-12', value:'7-12'},
    {label:'Some University', value:'Some University'},
    {label:"Bachelor's (1st Degree)", value:"Bachelor's (1st Degree)"},
    {label:"Master's (2nd Degree) or Higher", value:"Master's (2nd Degree) or Higher"},
    {label:"extra", value:"extra"},
]

const study = [
    {label:'Languages', value:'Languages'},
    {label:'Mathematics', value:'Mathematics'},
    {label:"Humanities", value:"Humanities"},
    {label:'Science', value:'Science'},
    {label:"Social Studies", value:"Social Studies"},
    
]

const PersonalinfoScreen = (props) =>{

    const [grade , setGrade] = useState('k-6');
    const [skills ,setSkills] = useState('Science');



    const handleNext = async () => {

        props.navigation.navigate('StudentDashboard',{
            type:type,
        });

    }

    const [type , setType] = useState(props.route.params.type);
    console.log('phone number screen  type is ',type);



    return(

<ScreenContainer  COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
    
        <View style={styles.backContainer}>
            <AntDesign name="arrowleft" size={20} color="black"/>
        </View>
 
        <HeaderAuthScreen />

        <View style={styles.WelcomeHeadingContiner}>
            <Text style={styles.headingTxt}>Personal Information</Text>
        </View>


        <View style={{...styles.genderInfo}}>
            <Text style={styles.txt}>What is the highest school grade that you completed</Text>

            <View style={{paddingTop:15,paddingBottom:15}} >
            <DropDownPicker
                items={grades}
                defaultValue={'K-6'}
                // value={grades}
                containerStyle={{height: 55, width:'100%',paddingLeft:0,marginHorizontal:'3%',marginLeft:0}}
                style={{backgroundColor: '#ffffff',elevation:5}}
                itemStyle={{
                    justifyContent: 'flex-start',
                    
                }}
                dropDownStyle={{backgroundColor: '#ffffff',marginTop:7,width:'170%'}}
                onChangeItem={item => setGrade(item.label)}
            />
            </View>
        </View>


        <View style={{ marginHorizontal:20,
        // borderWidth:1,
        marginTop:60}}>
       
        <Text style={ { fontSize:16,
        fontFamily:"Sansation_Bold",marginTop:15,marginBottom:15}}>What skills do you have to study</Text>
        {/*   
            

        <View style={{paddingTop:15,zIndex:10}} > */}
            <DropDownPicker
                items={study}
                defaultValue={'Languages'}
                containerStyle={{height: 55, width:'100%',paddingLeft:0,marginHorizontal:'3%',marginLeft:0}}
                style={{backgroundColor: '#ffffff',elevation:5}}
                itemStyle={{
                    justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#ffffff',marginTop:7,width:'170%'}}
                onChangeItem={item => setSkills(item.label)}
            />
            {/* </View>

*/}
        </View> 

        <View style={{...styles.genderInfo,marginTop:180,marginBottom:80}}>
            {/* <Text style={styles.txt}>What skills do you have to study</Text> */}
            
            <TouchableOpacity onPress={ ()=>handleNext()} style={{...styles.btn3,backgroundColor:'#3FB65F',alignItems:'center',justifyContent:'center'}}>
                <Text style={{...styles.txt2,fontWeight:'bold',color:'white'}}>{'Next'}</Text>
                {/* <AntDesign name="downcircleo" size={15} color="black" /> */}
            </TouchableOpacity>


        </View>

        </ScreenContainer>

    );
}

const styles = StyleSheet.create({
    txt2:{
        color:'black',
        fontSize:15,
        fontFamily:"Sansation_Bold",
    },
    btn3:{
        backgroundColor:'white',
        elevation:5,
        padding:20,
        borderRadius:5,
        width:'100%',
        marginVertical:15,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    btn:{
        paddingHorizontal:55,
        paddingVertical:20,
        // borderWidth:1,
        borderRadius:5,
        backgroundColor:'#3FB65F',
        marginBottom:5

    },
    btn2:{
        paddingHorizontal:55,
        paddingVertical:20,
        // borderWidth:1,
        borderRadius:5,
        backgroundColor:'white',
        elevation:5,
        marginBottom:5
    },
    genderBtnRow:{
        flexDirection:'row',
        // borderWidth:1,
        marginTop:10,
        justifyContent:'space-between',
        alignItems:'center',
        // paddingHorizontal:20,
    },
    txt:{
        fontSize:16,
        fontFamily:"Sansation_Bold",
    },
    genderInfo:{
        marginHorizontal:20,
        // borderWidth:1,
        marginTop:10,

    },
    backContainer:{
        height:20,
        // borderWidth:1,
        marginHorizontal:10,
        marginVertical:5
    },
    WelcomeHeadingContiner:{
        margin:10,
        // borderWidth:1,
        justifyContent:'center',
        alignItems:'center',

    },
    headingTxt:{
        fontSize:20,
        fontFamily:"Sansation_Bold",
        color:"#010169",

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

export default PersonalinfoScreen;