import AsyncStorageCommunity from "@react-native-community/async-storage";

const AUTH_TOKEN_KEY = "auth_token";
const ALL_INFO_KEY = "userInfo";
const APP_CHANNEL_KEY = "app_channel";
const APP_ID_KEY = "app_id";
const ROLE_ID_KEY = "role_id";
const SELECTED_ROLE_TYPE = "selected_role_type";
const CONTACT_PERSON_KEY = "contact_person";

export default class AsyncStorage {
  /**
   * @returns {Promise<string>}
   */

  static getAuthToken() {
    return AsyncStorageCommunity.getItem(AUTH_TOKEN_KEY);
  }

  static getAllInfo() {
    return AsyncStorageCommunity.getItem(ALL_INFO_KEY);
  }

  static setAuthToken(token) {
    AsyncStorageCommunity.setItem(AUTH_TOKEN_KEY,token)
  }

  static setAppChannelKey() {
    AsyncStorageCommunity.setItem(APP_CHANNEL_KEY,'c32f571d922b28bfcbbd93f0ce4fc115')
  }

  static getAppChannelKey() {
    return AsyncStorageCommunity.getItem(APP_CHANNEL_KEY);
  }

  static getAppId() {
    return AsyncStorageCommunity.getItem(APP_ID_KEY);
  }

  static setAppId(token) {
    AsyncStorageCommunity.setItem(APP_ID_KEY,token)
  }

  static getRoleId() {
    return AsyncStorageCommunity.getItem(ROLE_ID_KEY);
  }

  static setRoleId(roleId) {
    AsyncStorageCommunity.setItem(ROLE_ID_KEY,roleId)
  }

  static getSelectedRoleType() {
    return AsyncStorageCommunity.getItem(SELECTED_ROLE_TYPE);
  }

  static setSelectedRoleType(roleType) {
    AsyncStorageCommunity.setItem(SELECTED_ROLE_TYPE,roleType)
  }

  static addContactPerson(data) {
    var jsonObject = JSON.stringify(data)
    AsyncStorageCommunity.setItem(CONTACT_PERSON_KEY,jsonObject)
  }

  static getContactPersonData() {
    return AsyncStorageCommunity.getItem(CONTACT_PERSON_KEY);
  }
  
}
