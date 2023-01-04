import React from 'react';
import {View , Text , Image  ,StyleSheet, Dimensions ,TouchableOpacity, ScrollView } from 'react-native';
import ScreenContainer from "../../components/ScreenContainer";
import WalletHeader from "../../components/WalletHeader";
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import SearchBar from "../../components/SearchBar";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WalletScreenTwo = (props) => {


    const [WalleToggle , setWalleToggle] = React.useState(false);
    const [WalleToggle2, setWalleToggle2] = React.useState(false);



    return(
        <ScreenContainer COLOR={"#F4F7FC"}  statBrColor={"#F4F7FC"}  BrStyle={"dark-content"}>
            <View style={{margin:15}}>
                <HeaderAuthScreen />
            </View>

            <WalletHeader navigation={props.navigation}/>
            
            <View style={styles.content}>

                    <View style={{borderWidth:0,margin:20,paddingHorizontal:10}}>
                        <Text style={{textAlign:'justify',fontSize:15}}>In order that we can redeem your Tokens so that you can use it for different purposes, please completed our Know Your Consumer (KYC) steps. Have your Government ID and Proof of Address Documents ready for these steps.</Text>
                    </View>


                    <TouchableOpacity 
                        onPress={ () => props.navigation.navigate('WalletScreenThree')}
                        style={styles.dropDown}>
                        <Text style={styles.credit}>Upload your Government ID</Text>
                        <Ionicons name= "document-text-outline" size={20} color="black"/>
                    </TouchableOpacity>


                    <TouchableOpacity 
                        onPress={ () => props.navigation.navigate('WalletScreenThree')}

                        style={styles.dropDown}>
                        <Text style={styles.credit}>Upload your Proof of Address</Text>
                        <Ionicons name= "document-text-outline" size={20} color="black"/>

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

export default WalletScreenTwo;
