import React from "react";
import { createStackNavigator, } from '@react-navigation/stack';
import CreateAccountOrSignIn from "../screens/CreateAccountOrSignIn/CreateAccountOrSignIn";
import CreateAccount from "../screens/CreateAccount/CreateAccount";
import CreateAccountasStudent from "../screens/CreateAccount/CreateAccountasStudent";
import ReLogin from "../screens/CreateAccountOrSignIn/ReLogin";
import CreateAccountasTeacher from "../screens/CreateAccount/CreateAccountasTeacher";
import PhoneVerificationScreen from "../screens/PhoneVerificationScreen/PhoneVerificationScreen";
import Verified from "../screens/PhoneVerificationScreen/Verified";
import MySettings from "../screens/MySettings/MySettings";
import SocialLogin1 from "../screens/SocialLogin/SocialLogin1";
import SocialLogin2 from "../screens/SocialLogin/SocialLogin2";
import StudentDashboard from '../screens/student/StudentDashboard';
import TeacherDashboard from '../screens/teacher/TeacherDashboard';
import StudentCourseView from '../screens/student/StudentCourseView';
import StudentCheckout from '../screens/student/StudentCheckout';
import StudentOrderConformation from '../screens/student/StudentOrderConformation';
import StudenViewAllCourseList from '../screens/student/StudenViewAllCourseList';
import WalletScreenOne from "../screens/wallet/WalletScreenOne";
import WalletScreenTwo from "../screens/wallet/WalletScreenTwo";
import WalletScreenThree from "../screens/wallet/WalletScreenThree";
import WalletScreenFour from "../screens/wallet/WalletScreenFour";

import WalletScreenFive from "../screens/wallet/WalletScreenFive";

import TodayAppointment from '../screens/TodayAppointment';
import TodayAppointmentWithSelectedCourse from '../screens/TodayAppointmentWithSelectedCourse';
import MyClasses from '../screens/Classes/MyClasses';
import StudentCourseSearch from '../screens/student/StudentCourseSearch';
import CourseCheckout from '../screens/Classes/CourseCheckout';

import MyMessages from '../screens/Messages/MyMessages';
import ChatScreen from '../screens/Messages/ChatScreen';

import PhoneNumberScreen from '../screens/PhoneVerificationScreen/PhoneNumberScreen';
import PersonalinfoScreen from '../screens/CreateAccount/PersonalinfoScreen';


const { Navigator, Screen } = createStackNavigator();

export default class UnAuthorizedNavigationStack extends React.Component {
  render() {
    return <Navigator screenOptions={{ headerShown: false }} initialRouteName="CreateAccountOrSignIn">
      <Screen name="CreateAccountOrSignIn" component={CreateAccountOrSignIn} />
      <Screen name="CreateAccount" component={CreateAccount} />
      <Screen name="CreateAccountasStudent" component={CreateAccountasStudent} />
      <Screen name="CreateAccountasTeacher" component={CreateAccountasTeacher} />
      <Screen name="ReLogin" component={ReLogin} />
      <Screen name="PhoneVerificationScreen" component={PhoneVerificationScreen} />
      <Screen name="Verfied" component={Verified} />
      <Screen name="MySettings" component={MySettings} />
      <Screen name="SocialLogin1" component={SocialLogin1} />
      <Screen name="SocialLogin2" component={SocialLogin2} />
      <Screen name="StudentDashboard" component={StudentDashboard} />
      <Screen name="TeacherDashboard" component={TeacherDashboard} />
      <Screen name="StudentCourseView" component={StudentCourseView} />
      <Screen name="StudentCheckout" component={StudentCheckout} />
      <Screen name="StudentOrderConformation" component={StudentOrderConformation} />
      <Screen name="StudenViewAllCourseList" component={StudenViewAllCourseList} />
      <Screen name="WalletScreenOne" component={WalletScreenOne} />
      <Screen name="WalletScreenTwo" component={WalletScreenTwo} />
      <Screen name="WalletScreenThree" component={WalletScreenThree} />
      <Screen name="WalletScreenFour" component={WalletScreenFour} />
      <Screen name="WalletScreenFive" component={WalletScreenFive} />

      <Screen name="MyClasses" component={MyClasses} />
      <Screen name="StudentCourseSearch" component={StudentCourseSearch} />
      <Screen name="CourseCheckout" component={CourseCheckout} />

      <Screen name="TodayAppointment" component={TodayAppointment} />
      <Screen name="TodayAppointmentWithSelectedCourse" component={TodayAppointmentWithSelectedCourse} />
      <Screen name="MyMessages" component={MyMessages} />
      <Screen name="ChatScreen" component={ChatScreen} />
      <Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />
      <Screen name="PersonalinfoScreen" component={PersonalinfoScreen} />

      
      
      
      {/* <Screen name="SocialAuthStepOneScreen" component={SocialAuthStepOneScreen} />
      <Screen name="SocialAuthStepTwoScreen" component={SocialAuthStepTwoScreen} />
      <Screen name="SignUpScreen" component={SignUpScreen} />
      <Screen name="SellerFormRegisterScreen" component={SellerFormRegisterScreen} />
      <Screen name={"PhoneVerificationScreen"} component={PhoneVerificationScreen} />
      <Screen name={Constants.AppScreens.BusinessInfo} component={BusinessInfo} />
      <Screen name={Constants.AppScreens.QuestionnaireStepOne} component={QuestionnaireStepOne} />
      <Screen name={Constants.AppScreens.QuestionnaireStepTwo} component={QuestionnaireStepTwo} /> */}
      {/* ITS KEPT HERE ONLY FOR TESTING PURPOSES, AFTER TESTING IT SHOULD BE MOVED TO "AuthorizedNavigationStack" */}
    </Navigator>;
  }
}