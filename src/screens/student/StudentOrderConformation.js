import React from 'react';
import {View , Text , Image  ,StyleSheet, Dimensions ,TouchableOpacity, ScrollView } from 'react-native';
import ScreenContainer from "../../components/ScreenContainer";
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import SearchBar from "../../components/SearchBar";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Divider } from 'react-native-elements'

const StudentOrderConformation = () => {


    const img1 = require('../../assets/images/barcode.png');
    const img2 = require('../../assets/images/course.png');


    const CourseItem = ({img, title, price }) => {
        return(
    
            <View style={{...styles.row,marginBottom:10}}>
            <Image style={styles.courseImg}  source={img} />
        
            <View style={{...styles.row , flex:1,justifyContent:'space-between',alignItems:'center',paddingHorizontal:5}}>
                    <Text style={styles.courseTitle}>{title}</Text>
                    <View style={styles.row}>
                        <Text style={styles.coursePrice}>{price}</Text>
                        <Entypo name="chevron-down" size={20} color="black"/>
                    </View>
            </View>
        </View>
        )
    }



    return(

        <ScreenContainer COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>

            <View style={{marginTop:15}}>
                <HeaderAuthScreen />
            </View>

            <SearchBar />


            <View style={styles.container}>
            
                <View style={{alignItems:'center',justifyContent:'space-between',marginVertical:15,borderWidth:0,width:'100%',flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold',color:'#3FB65F',fontSize:18}}>Order Number</Text>
                    <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>SGN56768</Text>
                </View>
                

                <View style={{borderWidth:0,marginBottom:30,marginTop:15}}>
                    <Text style={{fontWeight:'bold',fontSize:18,color:'black'}}>Cancel Order (Before Course Begin)</Text>
                </View>

                
                <CourseItem img={img1} title={'MATH'}    price={'$ 55.5'} />
                <CourseItem img={img2} title={'ALGEBRA'} price={'$ 55.5'} />
                <CourseItem img={img1} title={'MATH'}    price={'$ 55.5'} />


                

                <Divider style={{ backgroundColor: 'black',marginTop:10, }} />

                <View style={styles.totalRow}>
                    <Text style={styles.totalTxt}>TOTAL</Text>
                    <Text style={{...styles.totalTxt,paddingRight:20}}>$ 166.5</Text>

                </View>


            </View>


        </ScreenContainer>
    );

}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        borderWidth:0,
    },
    row:{
        flexDirection:'row',
        // borderWidth:1,
        
        // backgroundColor:'white',
    },
    courseImg:{
        width:90,
        height:90,
    },
    courseTitle:{
        fontSize:15,
        fontWeight:'bold'
    },
    coursePrice:{
        fontSize:15,
        paddingRight:15,
        fontWeight:'bold'

    },
    totalRow:{
        // borderWidth:1,
        marginVertical:10,
        height:60,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
    },
    totalTxt:{
        fontWeight:'bold',
        fontSize:15,
    },
});


export default StudentOrderConformation;
