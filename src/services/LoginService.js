//Merve Yılmaz, 01.05.2023

import axios from "axios";

const token = localStorage.getItem("token");

const ipAdress = "localhost"
const port = "8080"

//login sayfasında kullanılan sorgular bu service de tanımlandı
export default class LoginService {

  getUserInfoByUserNameAndPassword(userName, password) {
    return axios.get(`http://${ipAdress}:${port}/UsersController/getUserInfoByUserNameAndUserPassword?userName=${userName}&password=${password}`);
  }

  getByPassword(password) {
    return axios.get(`http://${ipAdress}:${port}/UsersController/getUserByPassword?password=${password}`);
  }

  updatePassword(newPassword, userId) {
    return axios({
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://${ipAdress}:${port}/UsersController/updateUserPassword?newPassword=${newPassword}&userId=${userId}`,
      headers: { 'Authorization': 'Bearer ' + token }
    })
  }

  loginByUsernameAndPassword(username, password) {
    return axios.post(`http://${ipAdress}:${port}/login`, {
      "username": username,
      "password": password
    })

  };


}