import React from 'react';
import {View , Text , Image ,TextInput ,StyleSheet, Dimensions ,TouchableOpacity, ScrollView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';


 


const WalletHeader = ({navigation}) => {
    return(
        <View style={{height:60,backgroundColor:'#3FB65F',marginVertical:10,alignItems:'center',flexDirection:'row',paddingHorizontal:10,justifyContent:'space-between'}}>
        <TouchableOpacity onPress={ () =>navigation.goBack()} style={{flexDirection:'row'}}>
             <AntDesign  name="arrowleft" size={20} color="white" />
             <Text style={{ fontSize:15,paddingLeft:10,color:'white',fontWeight:'bold'}}>BLOCK ED WALLET</Text>
        </TouchableOpacity>

        <Entypo onPress={ () =>{}} name="dots-three-vertical" size={20} color="white" />
        



    </View> 
    );
}

export default WalletHeader;


