import React from 'react';
import {View , Text , Image  ,StyleSheet, Dimensions ,TouchableOpacity, ScrollView } from 'react-native';
import ScreenContainer from "../../components/ScreenContainer";
import WalletHeader from "../../components/WalletHeader";
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import SearchBar from "../../components/SearchBar";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const WalletScreenOne = (props) => {


    const [WalleToggle , setWalleToggle] = React.useState(false);
    const [WalleToggle2, setWalleToggle2] = React.useState(false);



    return(
        <ScreenContainer COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
            <View style={{margin:15}}>
                <HeaderAuthScreen />
            </View>

            <WalletHeader navigation={props.navigation}/>
            
            <View style={styles.content}>
                    <TouchableOpacity 
                        onPress={ () => { 
                        
                            setWalleToggle(!WalleToggle)
                            props.navigation.navigate('WalletScreenTwo')
                        }}
                        style={styles.dropDown}>
                        <Text style={styles.credit}>Block Wallet</Text>
                        <Entypo name={WalleToggle ==true ? "chevron-up" : "chevron-down"}  size={20} color="black"/>
                    </TouchableOpacity>


                    <TouchableOpacity 
                        onPress={ () => {setWalleToggle2(!WalleToggle2)
                            props.navigation.navigate('WalletScreenTwo')
                        
                        }}
                        style={styles.dropDown}>
                        <Text style={styles.credit}>BlockEd Coupons</Text>
                        <Entypo name={WalleToggle2 ==true ? "chevron-up" : "chevron-down"}  size={20} color="black"/>
                    </TouchableOpacity>



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
})

export default WalletScreenOne;
