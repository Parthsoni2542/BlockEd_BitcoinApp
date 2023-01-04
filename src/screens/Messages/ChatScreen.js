import React from 'react';
import HeaderAuthScreen from "../../components/HeaderAuthScreen";

import {View , Text , Image , TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';

import AntDesign  from 'react-native-vector-icons/AntDesign' 
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useLinkProps } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';


function ChatScreen (props) {

    const [selectedMenuItem , setMenuItem ] = React.useState('');
    const [myMsg , setMyMsg] = React.useState('');
    
    const Card = ({msg , align}) => (
        <View>
            <View style={{marginBottom:20,alignSelf:align == 'left'?'flex-start':'flex-end',borderWidth:0,marginHorizontal:10,backgroundColor:'#3FB65F',width:Dimensions.get('window').width /1.5,padding:10,borderRadius:20}}>
                <Text style={{color:'white'}}>{msg}</Text>
            </View>
            {align =="left" ? null : 
            <View  style={{marginBottom:10,alignSelf:align == 'left'?'flex-start':'flex-end',marginHorizontal:20}}>
                <Text>Read</Text>
            </View>
            }
        </View>
    )

    let {name} = props.route.params;

    return(
        // <ScreenContainer COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>

      <View style={{flex:1,backgroundColor:'#F4F7FC'}}>                 
          
            <View style={styles.header}>
                    <AntDesign onPress={ () =>props.navigation.goBack()} name="arrowleft" size={20} color="color" />
                    <Text style={{fontWeight:"bold"}}>{name}</Text>
                    <View style={{width:40,height:40 , borderRadius:50,justifyContent:'flex-start',alignItems:'center',borderWidth:0}}>
                    <Image source={{uri:'https://lh3.googleusercontent.com/a-/AOh14Gi871DaH0Rk9lXNHieC5hKKfcJJrRTg_Bgbb6kR=s96-c'}} style={{width:'100%',height:'100%' , borderRadius:50}} />
                
                    <View style={{backgroundColor:'#3FB65F',height:10,width:10,position:'absolute',bottom:0,right:5,borderRadius:10}}></View>   
            </View>

            </View>

            <View style={{borderWidth:0,borderRadius:3,marginBottom:10,marginHorizontal:10,justifyContent:'center',alignItems:'center',}}>
                <Text style={{color:'#CCC'}}>Typing...</Text>
            </View>


            <ScreenContainer COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"} >
            <View style={{marginBottom:50}}>
              <Card align='left' msg="this is the first message that i ever have and these are the details which i got from the students subjects and i will share this soon " />
              <Card align='right' msg="this is the first message that i ever have and these are the details which i got from the students subjects and i will share this soon " />
              <Card align='left' msg="this is the first message that i ever have and these are the details which i got from the students subjects and i will share this soon " />
              <Card align='right' msg="this is the first message that i ever have and these are the details which i got from the students subjects and i will share this soon " />
              <Card align='left' msg="this is the first message that i ever have and these are the details which i got from the students subjects and i will share this soon " />
              <Card align='left' msg="this is the first message that i ever have and these are the details which i got from the students subjects and i will share this soon " />
              <Card align='left' msg="this is the first message that i ever have and these are the details which i got from the students subjects and i will share this soon " />
              <Card align='left' msg="this is the first message that i ever have and these are the details which i got from the students subjects and i will share this soon " />
            </View>
            </ScreenContainer>

            <View style={{backgroundColor:'#F4F7FC',borderWidth:0,position:'absolute',bottom:0,width:'100%',alignItems:'center',}}>
                <View style={{flexDirection:'row',backgroundColor:'white',minHeight:50,borderWidth:0,borderRadius:30,width:'97%',margin:5,elevation:5,alignItems:'center',paddingHorizontal:20,}}>
                    {/* 
                    <TextInput placeholder="Type Message" multiline={true} style={{width:'100%'}}/>
                     */}

                     <View style={{flex:2,}}>
                        <TextInput placeholder="Type Message" multiline={true} style={{width:'100%'}}/>
                     </View>

                     <View style={{borderWidth:0,flex:1,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
                         <Entypo name="camera" size={20} color="black"/>
                         <MaterialCommunityIcons name="microphone" size={25} color="black"/>
                         <FontAwesome name="send" size={20} color="black"/>
                     </View>


                </View>
            </View>

</View>
        // </ScreenContainer>    
        )

}

const styles= StyleSheet.create({
    header:{
        flexDirection:'row',
        marginTop:30,
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center'

    },
    headerTxt:{
        fontSize:15,
        // paddingLeft:10,
        fontWeight:'bold'
    },
});

export default ChatScreen;




