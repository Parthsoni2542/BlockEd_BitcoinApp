import React from 'react';
import { View ,  Text , Image , TouchableOpacity , StyleSheet , TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';




const SearchBar = () => {
    return(
        <TouchableOpacity onPress={ () => {}} style={styles.container}>

                <Fontisto name="search" size={20} color="black" style={styles.searchIcon}/>
                <TextInput 
                    placeholderTextColor = "black"  
                    placeholder="SEARCH ALL COURSES"
                    underlineColorAndroid = "transparent"
                    style={styles.TxtInp}
                    // ,borderRadius:5,marginHorizontal:20,marginVkkdfkkdertical:10,paddingHorizontal:10,height:60,backgroundColor:'white'}}
                    />

                <MaterialCommunityIcons name="microphone-outline" size={30} color="black" style={styles.phoneIcon}/>

        </TouchableOpacity>
    );

}

const styles  = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderWidth:0,
        backgroundColor:'white',
        marginHorizontal:20,
        borderRadius:5,
        height:60,
        marginVertical:10,
        padding:10,
        alignItems:'center'
    },
    searchIcon:{
        paddingRight:10
    },
    TxtInp:{
        borderWidth:0,
        flex:1
    },
    phoneIcon:{
        paddingRight:10
    }
})

export default SearchBar;
