import React from 'react';
import HeaderAuthScreen from "../../components/HeaderAuthScreen";

import {View , Text , Image , TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';

import AntDesign  from 'react-native-vector-icons/AntDesign' 
import Entypo from 'react-native-vector-icons/Entypo';

import { useLinkProps } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';


function MyMessages (props) {

    const [selectedMenuItem , setMenuItem ] = React.useState('');

    const Card = ({name , img , active}) => (
        <TouchableOpacity onPress={() =>{props.navigation.navigate('ChatScreen',{
            name:name
        })}} style={{flex:1,flexDirection:'row',height:80,marginHorizontal:15,alignItems:'center',borderBottomColor:'#CCC',borderBottomWidth:0.5}}>
            <View style={{width:70,height:70 , borderRadius:50,justifyContent:'flex-start',alignItems:'center',borderWidth:0}}>
                <Image source={{uri:img}} style={{width:'100%',height:'100%' , borderRadius:50}} />
                {active == true ? 
                 <View style={{backgroundColor:'#3FB65F',height:10,width:10,position:'absolute',bottom:0,right:10,borderRadius:10}}></View>   
                 :null}
                 </View>

            <View style={{borderWidth:0,width:'80%',paddingHorizontal:10}}>
                <Text style={{fontWeight:"bold"}}>{name}</Text>
                <Text style={{fontWeight:"100"}}>Contact</Text>

                
            </View>
        </TouchableOpacity>
    )

    return(
        <ScreenContainer COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>

                       
          
            <View style={styles.header}>
                    <AntDesign onPress={ () =>{}} name="arrowleft" size={20} color="color" />
                    <Text style={{fontWeight:"bold"}}>Messages</Text>
                    <Entypo onPress={ () =>props.navigation.goBack()} name="dots-three-vertical" size={20} color="color" />

            </View>

            <View style={{borderWidth:0,borderRadius:3,marginVertical:15,marginHorizontal:15,elevation:5,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                <TextInput placeholder="Search Messages" />
            </View>


            <View style={{flex:1,borderWidth:0}}>

                <Card  active={true} img='https://lh3.googleusercontent.com/a-/AOh14Gi871DaH0Rk9lXNHieC5hKKfcJJrRTg_Bgbb6kR=s96-c' name="Qasim Yousaf" />
                <Card  active={false} img='https://lh3.googleusercontent.com/a-/AOh14Gi871DaH0Rk9lXNHieC5hKKfcJJrRTg_Bgbb6kR=s96-c' name="Robert William" />
                <Card  active={true} img='https://lh3.googleusercontent.com/a-/AOh14Gi871DaH0Rk9lXNHieC5hKKfcJJrRTg_Bgbb6kR=s96-c' name="Mick John" />
                <Card  active={false} img='https://lh3.googleusercontent.com/a-/AOh14Gi871DaH0Rk9lXNHieC5hKKfcJJrRTg_Bgbb6kR=s96-c' name="David Millan" />
                <Card  active={true} img='https://lh3.googleusercontent.com/a-/AOh14Gi871DaH0Rk9lXNHieC5hKKfcJJrRTg_Bgbb6kR=s96-c' name="Jorden Pill" />
                <Card  active={true} img='https://lh3.googleusercontent.com/a-/AOh14Gi871DaH0Rk9lXNHieC5hKKfcJJrRTg_Bgbb6kR=s96-c' name="Hannery ford " />
                <Card  active={true} img='https://lh3.googleusercontent.com/a-/AOh14Gi871DaH0Rk9lXNHieC5hKKfcJJrRTg_Bgbb6kR=s96-c' name="Hannery ford " />
   

            </View>


        </ScreenContainer>    
        )

}

const styles= StyleSheet.create({
    header:{
        flexDirection:'row',
        marginTop:30,
        justifyContent:'space-between',
        paddingHorizontal:10

    },
    headerTxt:{
        fontSize:15,
        // paddingLeft:10,
        fontWeight:'bold'
    },
});

export default MyMessages;




