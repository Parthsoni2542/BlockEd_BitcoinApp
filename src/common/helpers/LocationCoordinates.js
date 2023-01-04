import { PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";
import Common from '../Common';

export default class LocationCoordinates {

    static async getCoordinates() {
        let isGranted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (isGranted == PermissionsAndroid.RESULTS.GRANTED) {
            let result = await this.getPosition()
                .then((res) => {
                    return res;
                })
            return result;
        }
        else {
            let userPermissionGranted = Common.requestPermissions(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (userPermissionGranted) {
                let result = await this.getPosition()
                    .then((res) => {
                        return res;
                    })
                return result;
            }
        }
    }

    static getPosition() {
        return new Promise((resolve) => {
            Geolocation.getCurrentPosition(
                (position) => {
                    var data = []
                    data.push(parseFloat(position.coords.longitude))
                    data.push(parseFloat(position.coords.latitude))
                    resolve(data)
                },
                error => {
                    console.log(error.code, error.message);
                    resolve(error)
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        })
    }

}

