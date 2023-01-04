
import { PermissionsAndroid } from 'react-native';
import Snackbar from 'react-native-snackbar';
import Constants from '../common/Constants.json';

export default class Common {

  static SNACKBAR_SUCCESS = "success";
  static SNACKBAR_ERROR = "error";
  static SNACKBAR_INFO = "info";

  static emptyMethod() { }

  static async requestPermissions(permission) {
    let result = await PermissionsAndroid.request(
      permission
      ,
      {
        title: 'Permissions required!',
        message: 'Application needs some permissions to run!',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    ).then((res) => { return res })

    var resultArray = Object.values(result)
    var isGranted = false

    if (resultArray.length > 0 && resultArray.includes("denied")) {
      isGranted = false;
    } else {
      isGranted = true;
    }

    return isGranted;
  }


  /**
     * Shows custom snackbar based on type.
     * @param text Message to display.
     * @param snackbarType Snackbar type (Success, error or info) .
     */

  static showSnackbar(text, snackbarType) {
    var backgroundColor = ""
    switch (snackbarType) {
      case this.SNACKBAR_SUCCESS:
        backgroundColor = Constants.AppColors.SnackbarColors.Success;
        break;
      case this.SNACKBAR_ERROR:
        backgroundColor = Constants.AppColors.SnackbarColors.Error;
        break;
      case this.SNACKBAR_INFO:
        backgroundColor = Constants.AppColors.SnackbarColors.Info;
        break;
      default: backgroundColor = Constants.AppColors.SnackbarColors.Info;
    }

    Snackbar.show({
      text: text,
      backgroundColor: backgroundColor,
      duration: Snackbar.LENGTH_LONG,

    })

  }

  static formatDateWithoutTime(date) {
    if (date != '') {
      date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
    return date;
  }

}