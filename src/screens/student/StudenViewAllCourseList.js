import React , {useState, useEffect} from "react";
import {View , Text , Image  , ActivityIndicator,StyleSheet, FlatList,Dimensions ,TouchableOpacity, ScrollView } from 'react-native';
import ScreenContainer from "../../components/ScreenContainerNonScroll";
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import SearchBar from "../../components/SearchBar";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Constants from '../../common/Constants.json';
import AsyncStorage from "./../../services/AsyncStorage";


const StudenViewAllCourseList = (props) => {
    const [CourseData, setCourseData] = useState([]);
    const [load, setLoad] = useState(false);
    var cr=[];
   
   
    async function createPostRequest()  {
        console.log("Sarchprops", props.route.params.SearchingText)

        let auth = await AsyncStorage.getAllInfo();
        let json = JSON.parse(auth)
    //    console.log("Token",json.authToken)

    setLoad(true);



        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer "+json.authToken);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
   //     console.log(Constants.BaseUrl)
        
        fetch(Constants.BaseUrl +"/api/v1/coursesfeed?search="+ props.route.params.SearchingText, requestOptions)
          .then(response => response.json())
          .then(result => 
            
          {  
              
            setLoad(false);

                     
         setCourseData(result.data)
        
        }
            )
          .catch(error => {
            setLoad(false);  
            alert('No Record Found');
            props.navigation.navigate('StudentDashboard')
            console.log('error', error)}
          
          );




    }

  
    
        const renderItem = ({ item }) =>   { 
          // console.log("Uri",item.image)
            return ( 
                 <TouchableOpacity
              
                  onPress={() => {
                    
                      props.navigation.navigate('StudentCourseView', { CourseData:item })
                    }} 
                  style={styles.content}>
                     <View style={styles.imgCon}>
                        
                         <Image
        
        style={styles.img} 
       
        source = {{uri: item.image}}    
    
      />
                     </View>
        
                     <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardPrice}>$ 22.2</Text> 
                     </View>
                </TouchableOpacity>
        )
    }



    useEffect(() => {
      createPostRequest()
      }, []);


    return(
        <ScreenContainer COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
    

            <View style={styles.container}>

                <View style={styles.header}>
                    <AntDesign onPress={ () =>props.navigation.goBack()} name="arrowleft" size={20}
                     color="black" 
                     />
                    <Text style={styles.headerTxt}>SELECT AVAILABLE COURSE</Text>
                </View>

                {load && <ActivityIndicator color="red" size="small" />}

                   

 
<FlatList
        data={CourseData}
        renderItem={renderItem}
        keyExtractor={item => item.title}
     //  keyExtractor={item => Math.random()}
      />


            </View>   




        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10,
        // borderWidth:1,
        marginTop:30

    },
    header:{
        flexDirection:'row',
        marginBottom:30,

    },
    headerTxt:{
        fontSize:15,
        paddingLeft:10,
        fontWeight:'bold'
    },
    content:{
        // borderWidth:1,
        // marginHorizontal:10
        marginBottom:10,
        flexDirection:'row',
        backgroundColor:'white',
        elevation:5,
        // borderWidth:1,
        
        // borderRadius:5
    },
    imgCon:{
        width:100,
        height:100
    },
    img:{
        width:'100%',
        height:'100%',
    },
    cardContent:{
        padding:10,
        // backgroundColor:'red',
        width:'70%',



    },
    cardTitle:{
        fontWeight:'bold',
        fontSize:15,
        color:'black',

    },
    cardPrice:{
        fontWeight:'bold',
        fontSize:15,
        color:'#3FB65F',
        paddingTop:5
        
    }
});

export default StudenViewAllCourseList;
