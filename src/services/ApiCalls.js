import Constants from '../common/Constants.json';
import axios from 'axios';
import AsyncStorage from './AsyncStorage';


export default class ApiCalls {

    static createPostRequest = async (url, body) => {

        let authToken = await AsyncStorage.getAuthToken();

        let response = await axios.post(Constants.BaseUrl + url
            , body != null ? body : null
            , authToken != "" && { headers: { Authorization: `Bearer ${authToken}` } }
        ).catch((err) => {
            return err;
        });
        return response;
    }

    static createGetRequest = async (url) => {

        let authToken = await AsyncStorage.getAuthToken();

        let response = await axios.get(Constants.BaseUrl + url
            , authToken != "" && { headers: { Authorization: `Bearer ${authToken}` } }
        ).catch((err) => {
            return err
        });

        return response;
    }

}

