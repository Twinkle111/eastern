import { RestUtils } from "../utils/RestUtils";
const GET_USER_LIST = "https://reqres.in/api/users?page=";
const GET_USER_DATA = "https://reqres.in/api/users/";

export function getUserList(param, successCallback, failureCallback) {
  RestUtils.get(GET_USER_LIST + param)
    .then((response) => {
      if (response.status === 200) {
        console.log(GET_USER_LIST + response.status, response);
        successCallback(response.data);
      } else {
        failureCallback(response);
        console.log(GET_USER_LIST + response.status, response);
      }
    })
    .catch((err) => {
      console.log(GET_USER_LIST + "axios error : ", err);
      failureCallback(err);
    });
}

export function getUserData(param, successCallback, failureCallback) {
  RestUtils.get(GET_USER_DATA + param)
    .then((response) => {
      if (response.status === 200) {
        console.log(GET_USER_DATA + param, response.status, response);
        successCallback(response.data);
      } else {
        failureCallback(response);
        console.log(GET_USER_DATA + param, response.status, response);
      }
    })
    .catch((err) => {
      console.log(GET_USER_DATA + param, "axios error : ", err);
      failureCallback(err);
    });
}
