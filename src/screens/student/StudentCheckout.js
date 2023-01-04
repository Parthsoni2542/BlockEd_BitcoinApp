import React from 'react';
import {View , Text , Image  ,StyleSheet, Dimensions ,TouchableOpacity, ScrollView } from 'react-native';
import ScreenContainer from "../../components/ScreenContainer";
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import SearchBar from "../../components/SearchBar";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
// import { ScrollView } from 'react-native-gesture-handler';

const StudentCheckout = (props) => {

    const img1 = require('../../assets/images/barcode.png');
    const img2 = require('../../assets/images/course.png');
    const [country , setCountry] = React.useState('uk');
    const [toggleCourse , setToggleCourse] = React.useState(false);


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
{/* <ScrollView> */}
            <View style={{marginTop:15}}>
                <HeaderAuthScreen />
            </View>

            <SearchBar />

            <View style={styles.container}>
                <CourseItem img={img1} title={'MATH'}    price={'$ 55.5'} />
                <CourseItem img={img2} title={'ALGEBRA'} price={'$ 55.5'} />
            
                <TouchableOpacity style={styles.fileBtn}>
                    <AntDesign name="upload" size={20} color="black"/> 
                    <Text style={styles.coupon}>Coupon/Credit for Free course(s)</Text>
                </TouchableOpacity>

                <View style={styles.totalRow}>
                    <Text style={styles.totalTxt}>TOTAL</Text>
                    <Text style={{...styles.totalTxt,paddingRight:20}}>$ 105.5</Text>

                </View>



                 <View >

                    <TouchableOpacity 
                        onPress={ () => setToggleCourse(!toggleCourse)}
                        style={styles.dropDown}>
                        <Text style={styles.credit}>CREDIT FREE COURSES(S) SELECT</Text>
                        <Entypo name={toggleCourse ==true ? "chevron-up" : "chevron-down"}  size={20} color="black"/>
                    </TouchableOpacity>
 
                {toggleCourse ==true ?
                    <View style={styles.courseCon}>
                        <TouchableOpacity style={styles.course}>
                            <Text>COURSE A</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.course}>
                            <Text>COURSE A</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.course}>
                            <Text>COURSE A</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.course}>
                            <Text>COURSE A</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.course}>
                            <Text>COURSE A</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.course}>
                            <Text>COURSE A</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.course}>
                            <Text>COURSE A</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.course}>
                            <Text>COURSE A</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.course}>
                            <Text>COURSE A</Text>
                        </TouchableOpacity>


                        
                        
                    </View>

                :null}
 

 

                </View>



                <TouchableOpacity style={styles.btn} onPress={ () => props.navigation.navigate('StudentOrderConformation')}>
                    <Text style={styles.cartTxt}>Pay in BlockEd Wallet</Text>
                </TouchableOpacity>


            </View>


            {/* </ScrollView> */}

         </ScreenContainer>
    );

}


const styles = StyleSheet.create({
    container:{
        // flex:1,
        // backgroundColor:'red',
        marginHorizontal:20,
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
    fileBtn:{
        // borderWidth:1,
        height:60,
        borderRadius:5,
        backgroundColor:'white',
        elevation:5,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
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
    dropDown:{
        // borderWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:15
    },
    btn:{
        width:'100%',
        padding:15,
        backgroundColor:'#3FB65F',
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        flexDirection:'row',
        marginBottom:20,
        elevation:5
    },
    cartTxt:{
        fontSize:20,
        fontWeight:'bold',
        color:'white',
        paddingLeft:10
    },
    coupon:{
        paddingLeft:10,
        fontSize:15 , 
        fontWeight:'bold'
    },
    credit:{
        paddingLeft:10,
        fontSize:15 , 
        fontWeight:'bold'
    },
    course:{
        padding:10,
        marginLeft:5,
        marginBottom:5,
        borderBottomColor:'#CCC',
        borderBottomWidth:0.5
    },
    courseCon:{
        width:'100%',
        borderWidth:0,
        marginTop:5,
        backgroundColor:'white',
        marginBottom:20
    }
});


export default StudentCheckout;
