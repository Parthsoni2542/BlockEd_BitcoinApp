import React from 'react';
import {View , Text , Image  ,StyleSheet, Dimensions ,TouchableOpacity, ScrollView } from 'react-native';
import ScreenContainer from "../../components/ScreenContainer";
import WalletHeader from "../../components/WalletHeader";
import HeaderAuthScreen from "../../components/HeaderAuthScreen";
import SearchBar from "../../components/SearchBar";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WalletScreenFour = (props) => {


    const [WalleToggle , setWalleToggle] = React.useState(false);
    const [WalleToggle2, setWalleToggle2] = React.useState(false);

    const handleNavigation = () =>{
        props.navigation.navigate('WalletScreenFive');

    }

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

                    <TouchableOpacity 
                        // onPress={ () => props.navigation.navigate('TodayAppointment')}

                        onPress={ () => handleNavigation()}
                        style={styles.dropDown}>
                        <Text style={styles.credit}>Tokens to be converted or sent</Text>
                        <Ionicons name= "arrow-forward-circle-sharp" size={22} style={{marginRight:10}} color='#727C8E'/>

                    </TouchableOpacity>






                    <TouchableOpacity 
                        // onPress={ () => props.navigation.navigate('TodayAppointment')}

                        onPress={ () => handleNavigation()}

                        style={styles.dropDown}>
                        <View style={{flex:2}}>
                            <Text style={styles.credit}>Exchange your tokens to USDC (USD$) or other Cryptocurrency</Text>                        
                        </View>
    
                        <View style={{flex:0.25}}>
                            <Ionicons name= "arrow-forward-circle-sharp" size={22} style={{marginRight:10}} color='#727C8E'/>

                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity 
                        // onPress={ () => props.navigation.navigate('TodayAppointment')}

                        onPress={ () => handleNavigation()}
                        style={styles.dropDown}>
                        <View style={{flex:2}}>
                            <Text style={styles.credit}>Cash-out your tokens to your local currency at a local ATM</Text>                        
                        </View>
    
                        <View style={{flex:0.25}}>
                            <Ionicons name= "arrow-forward-circle-sharp" size={22} style={{marginRight:10}} color='#727C8E'/>

                        </View>

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
    img:{
        width:'100%',
        height:'100%',
        borderRadius:10
    }
})

export default WalletScreenFour;
