import { StyleSheet } from 'react-native';
import { AppColors } from "../../common/Constants.json";
import CommonStyles from "../../common/Styles";

const styles = StyleSheet.create({

  screenHeadingView: {
    ...CommonStyles.formElement,
    marginTop: 10
  },
  socialLoginHeadingView: {
    ...CommonStyles.formElement,
    marginTop: -10,
    paddingBottom: 65
  },
  screenHeadingText: {
    fontSize: 25,
    color: "#303030",
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Sansation_Bold",
    paddingTop: 75,
  },
  socialHeadingText: {
    fontSize: 25,
    color: "#303030",
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Sansation_Bold",
    paddingTop: 45,
  },
  secondaccounttext: { 
    // letterSpacing: 1,
    fontFamily: 'Sansation_Bold',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
    color: '#767676',
    marginBottom: 25,
    
  },
  zoom: {
    backgroundColor: "#CCEEE1",
    borderRadius: 7,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'center',
    width: "90%",
    marginHorizontal: "5%",
    flexDirection:'row',
    
  },
  zoomimg: {
    // height: 35,
    // width: 35,
    justifyContent:'flex-end',
    alignContent:'flex-end',
    
    
  },
  socialText: {
    fontFamily: "Sansation_Bold",
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: "center",
    color: '#000000',
    paddingLeft: 15,
    // borderWidth:1
  },
  row:{flexDirection:'row',marginHorizontal:20,borderRadius:7,alignItems:'center',paddingHorizontal:10,backgroundColor:'#CCEEE1',height:55,marginBottom:15,justifyContent:'space-between'},
  skipRow:{flexDirection:'row',
  alignSelf:'center',
  marginHorizontal:100,borderRadius:7,
  alignItems:'center',paddingHorizontal:55,
  height:55,width:250,marginBottom:15,
  justifyContent:'space-between'},
  txt:{fontFamily: "Sansation_Bold",fontStyle: 'normal',fontSize: 16,alignItems: "center",color: '#000000'},
  skipTxt:{fontFamily: "Sansation_Bold",fontStyle: 'normal',fontSize: 20,alignItems: "center",color: '#3FB65F',textDecorationLine:'underline'},
  img:{width:35,height:35},
});

export default styles;
