import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import SplashScreen from "react-native-splash-screen";
import UnAuthorizedNavigationStack from "./UnAuthorizedNavigationStack";
import { Provider } from 'react-redux';
import store from '../redux/store';

import AuthorizedNavigationStack from './AuthorizedNavigationStack';


const { Navigator, Screen } = createStackNavigator();

export default class AppNavigator extends React.Component {
  state = {
    authToken: "",
    appId: '',
  };
  async componentDidMount() {

    // AsyncStorage.setAuthToken(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNzVhYWQ1MDcxN2Y4NTE0YzkwNTIxZCIsImlhdCI6MTU5NTI2NjEzMywiZXhwIjoxNTk3ODU4MTMzfQ.-fbBfMNRkpB2ks-lnMSSkgyt8kycj3fTektmcaGfL90`)
    // AsyncStorage.setAppId('5ebbca473e61a73368ab1bfe')

    // const authToken = await AsyncStorage.getAuthToken();
    // const appId = await AsyncStorage.getAppId();
    // AsyncStorage.setAppChannelKey();

    // const checkPermissions = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

    // if (checkPermissions != PermissionsAndroid.RESULTS.GRANTED) {
    //   Common.requestPermissions(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    // }

    // this.setState({ authToken, appId });

    // await this.getRoles()
    SplashScreen.hide();

    // Pushy.listen();
    // DeviceInfo.getUniqueId()
    // .then(uniqueId => {
    //   console.log("device ID --------",uniqueId)
    // })
    // .catch(err=>console.log("err in device id",err))

  }

  render() {
    const { authToken } = this.state;
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Navigator screenOptions={{ headerShown: false }}>
            {/* {authToken == "" && <Screen name="UnAuthorizedNavigationStack" component={UnAuthorizedNavigationStack} />} */}
              <Screen name="UnAuthorizedNavigationStack" component={UnAuthorizedNavigationStack} />
              <Screen name="AuthorizedNavigationStack" component={AuthorizedNavigationStack} />
          </Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
