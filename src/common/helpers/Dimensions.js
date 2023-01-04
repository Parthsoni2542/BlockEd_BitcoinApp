import { Dimensions as ReactNativeDimensions } from "react-native";

// https://stackoverflow.com/a/44979327/8075004 , screen vs window (android only)
const _screenDimension = ReactNativeDimensions.get("screen");

export default class Dimensions {
  static screenHeight = _screenDimension.height;
  static screenWidth = _screenDimension.width;

  /**
   * @returns {Number}
   */
  static portraitWidth = (function () {
    if (_screenDimension.height < _screenDimension.width) {
      return _screenDimension.height;
    }
    return _screenDimension.width;
  })();

  /**
   * @returns {Number}
   */
  static portraitHeight = (function () {
    if (_screenDimension.width > _screenDimension.height) {
      return _screenDimension.width;
    }
    return _screenDimension.height;
  })();
}
