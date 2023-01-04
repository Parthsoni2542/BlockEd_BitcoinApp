import React from 'react';
import HeaderAuthScreen from "../../components/HeaderAuthScreen";

import {View , Text , Image , TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SearchBar from "../../components/SearchBar";

import AntDesign  from 'react-native-vector-icons/AntDesign' 
import { useLinkProps } from '@react-navigation/native';
function StudentCourseSearch (props) {

    const [selectedMenuItem , setMenuItem ] = React.useState('');
    const handleNavigation =  (nextScreen) => {
        props.navigation.navigate(nextScreen);

}

    return(
        <ScreenContainer COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>

                       
            <View style={{marginTop:15}}>
                <HeaderAuthScreen />
            </View>


<SearchBar />
        
           

           <View style={{flex:1,borderWidth:0, flexDirection:'row',paddingBottom:10}}>




              <View style={{flex:2,borderWidth:0,paddingHorizontal:10}}>

                <TouchableOpacity  onPress={ () =>{
                        setMenuItem('Reading');
                        handleNavigation('StudentCourseView');

                }} style={{backgroundColor: selectedMenuItem == "Reading"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                        <Text style={{color:selectedMenuItem == "Reading"?'white':'black',fontSize:16,fontWeight:'bold'}}>Reading</Text>
                </TouchableOpacity>



                <TouchableOpacity  onPress={ () =>{
                        setMenuItem('Math')

                }} style={{backgroundColor: selectedMenuItem == "Math"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                        <Text style={{color:selectedMenuItem == "Math"?'white':'black',fontSize:16,fontWeight:'bold'}}>Math</Text>
                </TouchableOpacity>



                <TouchableOpacity  onPress={ () =>{
                        setMenuItem('Science')

                }} style={{backgroundColor: selectedMenuItem == "Science"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                        <Text style={{color:selectedMenuItem == "Science"?'white':'black',fontSize:16,fontWeight:'bold'}}>Science</Text>
                </TouchableOpacity>


                <TouchableOpacity  onPress={ () =>{
                        setMenuItem('Economic')

                }} style={{backgroundColor: selectedMenuItem == "Economic"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                        <Text style={{color:selectedMenuItem == "Economic"?'white':'black',fontSize:16,fontWeight:'bold'}}>Economic & Finance</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={ () =>{
                        setMenuItem('Arts')

                }} style={{backgroundColor: selectedMenuItem == "Arts"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                        <Text style={{color:selectedMenuItem == "Arts"?'white':'black',fontSize:16,fontWeight:'bold'}}>Arts & Humanities</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={ () =>{
                        setMenuItem('Digital_Media')

                }} style={{backgroundColor: selectedMenuItem == "Digital_Media"?'#3FB65F':'transparent',marginHorizontal:5,marginTop:10,borderRadius:20,borderWidth:0,paddingHorizontal:30,paddingVertical:15}}>
                        <Text style={{color:selectedMenuItem == "Digital_Media"?'white':'black',fontSize:16,fontWeight:'bold'}}>Digital Media</Text>
                </TouchableOpacity>



                </View> 


                <View style={{flex:1,borderWidth:0,height:Dimensions.get('window').height -100,backgroundColor:'white',borderTopLeftRadius:20,borderBottomLeftRadius:20,elevation:5}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',paddingLeft:10,paddingTop:10}}>
                        <AntDesign onPress={ () =>{props.navigation.goBack()} } name="close" size={20} color="black" />
                    </View>
                   
                    <View style={{flex:10,borderWidth:0}}>
                        <Image resizeMode="contain" source={require('../../assets/images/girl.png')} style={{width:'100%',height:'100%'}} />

                    </View>

                </View>



            </View>    
       

        </ScreenContainer>
        
    )
}


const styles= StyleSheet.create({
    
});

export default StudentCourseSearch;