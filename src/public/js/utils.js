import axios from 'axios'
let instance = axios.create({});
const $postHttp = function (url, param) {
    // let coEntid = localStorage.getItem('coEntid');
    // instance.defaults.headers.common['token'] = localStorage.getItem("token_entid"+coEntid);
  // Add a request interceptor
    instance.interceptors.request.use(function (config) {
  
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
  
  // Add a response interceptor
    instance.interceptors.response.use(function (response) {
      // Do something with response data
  
      return response;
    }, function (error) {
      // Do something with response error
      return Promise.reject(error);
    });
    return instance.post(url, param);
  };
  export default {
      "$postHttp":$postHttp
  }