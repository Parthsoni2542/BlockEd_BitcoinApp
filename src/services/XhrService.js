/**
 * @param {XMLHttpRequest} xhr
 */
function ResponseCallback(xhr) { }

/**
 * @callback RequestCallback
 * @param {XMLHttpRequest} xhr
 */

export default class XhrService {
  /**
   * @param {String} url
   * @param {RequestCallback} responseCallback
   */
  static Get(url, responseCallback = ResponseCallback) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (e) =>{
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        console.log('success', xhr.responseText);
      } else {
        console.warn('error');
      }
    }
    
    xhr.open('GET','https://jsonplaceholder.typicode.com/todos/1');
    xhr.send();

  }

  static Post(url, body,responseCallback = ResponseCallback) {
  
    const xhr = new XMLHttpRequest();

    

  }


}
