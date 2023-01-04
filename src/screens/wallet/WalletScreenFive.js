import React from 'react';
import {View , Text , Image  ,StyleSheet, Dimensions ,TouchableOpacity, ScrollView } from 'react-native';
import ScreenContainer from "../../components/ScreenContainer";
import WalletHeader from "../../components/WalletHeader";
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import SearchBar from "../../components/SearchBar";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WalletScreenFive = (props) => {


    const [WalleToggle , setWalleToggle] = React.useState(false);
    const [WalleToggle2, setWalleToggle2] = React.useState(false);



    return(
        <ScreenContainer COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
            <View style={{margin:15}}>
                <HeaderAuthScreen />
            </View>

            <WalletHeader navigation={props.navigation}/>
            

            

            <View style={styles.content}>

                   

            <View style={{height:130,width:Dimensions.get('window').width -28,margin:12,borderRadius:10,marginTop:20}}>
                        <Image style={styles.img} source={require('../../assets/images/wallet.png')} resizeMode="cover" />
            </View>

                    {/* <TouchableOpacity 
                        // onPress={ () => props.navigation.navigate('TodayAppointment')}

                        onPress={ () => {}}
                        style={styles.dropDown}>
                        <Text style={styles.credit}>Tokens to be converted or sent</Text>
                        <Ionicons name= "arrow-forward-circle-sharp" size={22} style={{marginRight:10}} color='#727C8E'/>

                    </TouchableOpacity> */}
                    <Text style={{...styles.credit,marginHorizontal:10,textAlign:'center',marginTop:15}}>Your tokens have been sent, converted, or cash-out</Text>






                 


            </View>
        
        
        </ScreenContainer>
    );
}


const styles = StyleSheet.create({
    headerTxt:{
        fontSize:15,
        paddingLeft:10,
        fontWeight:'bold'
    },
    content:{
        borderWidth:0,
    },
    dropDown:{
        // borderWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:20,
        backgroundColor:'white',
        marginHorizontal:20,
        elevation:5,
        paddingHorizontal:5,
        marginVertical:10,
        borderRadius:5
    },
    credit:{
        paddingLeft:10,
        fontSize:15 , 
        // fontWeight:'bold'
    },
    img:{
        width:'100%',
        height:'100%',
        borderRadius:10
    }
})

export default WalletScreenFive;
