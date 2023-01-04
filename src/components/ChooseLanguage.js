import React from 'react';
import {View , Text, TouchableOpacity, Image ,Dimensions} from 'react-native';


const ChooseLanguage = ({openModel}) =>{

    return(
        <View style={{padding:10,flex:1,elevation:5,backgroundColor:'white',width:Dimensions.get('window').width/2.5,borderRadius:3,position:'absolute',top:70,zIndex:1,right:10}}>
              <TouchableOpacity style={{marginBottom:15}}>
                <Text>English</Text>
              </TouchableOpacity>


              <TouchableOpacity style={{marginBottom:15}}>
                <Text>French</Text>
              </TouchableOpacity>


              <TouchableOpacity style={{marginBottom:15}}>
                <Text>Spanish</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{marginBottom:15}}>
                <Text>Chinese</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{marginBottom:15}}>
                <Text>Hindi</Text>
              </TouchableOpacity>


            </View>
    );

}

export default ChooseLanguage;
