
import React from 'react';
import {View , Text , Image  ,StyleSheet, Dimensions ,TouchableOpacity, ScrollView } from 'react-native';
import ScreenContainer from ".././components/ScreenContainer";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CalendarPicker from 'react-native-calendar-picker';

export default class TodayAppointmentWithSelectedCourse extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
          selectedStartDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
      }


      onDateChange(date) {
        this.setState({
          selectedStartDate: date,
        });
      }



render(){
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';


    return(

        <ScreenContainer COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
        
        <View style={{marginHorizontal:10,marginVertical:20}}>
            <TouchableOpacity onPress={ () =>this.props.navigation.goBack()} style={{flexDirection:'row'}}>
                <AntDesign  name="arrowleft" size={20} color="#4B4B4B" />
                <Text style={{ fontSize:15,paddingLeft:10,color:'#4B4B4B',fontWeight:'bold'}}>TODAY APPOINTMENT</Text>
            </TouchableOpacity>
        </View>


        <View style={{backgroundColor:'white',elevation:5, marginHorizontal:5,height:300,marginTop:10,borderRadius:10,marginBottom:20}}>
        <CalendarPicker
                onDateChange={this.onDateChange}
                />
        
       
        </View>

        <View style={{borderWidth:0,elevation:5,borderRadius:5,marginHorizontal:10,marginBottom:10,backgroundColor:'white',minHeight:100,paddingVertical:10,paddingHorizontal:15}}>
            <View style={{borderWidth:0,}}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>Mathematics for Computer Games Development</Text>
                <Text style={{fontSize:16,fontWeight:'bold',color:'green',marginTop:5}}>Aug 20, 2020</Text>
            </View>
        </View>



        <View style={{borderWidth:0,elevation:5,borderRadius:5,marginHorizontal:10,marginBottom:10,backgroundColor:'white',minHeight:100,paddingVertical:10,paddingHorizontal:15}}>
            <View style={{borderWidth:0,}}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>Mathematics for Computer Games Development</Text>
                <Text style={{fontSize:16,fontWeight:'bold',color:'green',marginTop:5}}>Aug 20, 2020</Text>
            </View>
        </View>


        {/* <View style={{borderWidth:0,elevation:5,borderRadius:5,marginHorizontal:10,marginBottom:10,backgroundColor:'white',minHeight:100,paddingVertical:10,paddingHorizontal:15}}>
            <View style={{borderWidth:0,}}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>Mathematics for Computer Games Development</Text>
                <Text style={{fontSize:16,fontWeight:'bold',color:'green',marginTop:5}}>Aug 20, 2020</Text>
            </View>
        </View> */}



        {/* <View style={{borderWidth:0,elevation:5,borderRadius:5,marginHorizontal:10,marginBottom:10,backgroundColor:'white',minHeight:100,paddingVertical:10,paddingHorizontal:15}}>
            <View style={{borderWidth:0,}}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>Mathematics for Computer Games Development</Text>
                <Text style={{fontSize:16,fontWeight:'bold',color:'green',marginTop:5}}>Aug 20, 2020</Text>
            </View>
        </View> */}


        {/* <View>
          <Text>SELECTED DATE:{ startDate }</Text>
        </View> */}

         </ScreenContainer>
    );

}

}
const styles = StyleSheet.create({
    
    
});

