//Merve Yılmaz, 01.05.2023

import React, { useState, useEffect } from "react";
import { Button, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoginService from '../services/LoginService';
import QuestionnairesService from '../services/QuestionnairesService';
import anketImage from '../images/anket2.jpg';

export default function Login() {

  //requestlerin bulunduğu service sınıflarını kullanmak için tanımladım
  const loginService = new LoginService()
  const questionnairesService = new QuestionnairesService()

  //sayfalar arası geçiş yapmamızı sağlar
  const navigate = useNavigate();

  //kulanıcı giriş bilgilerini tutan değişkenler
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordDB, setUserPasswordDB] = useState("");

  //giriş yapmak içn tanımlanan butona tıklanıldığında bu fonksyion çalışır
  function loginHandleClick() {

    //giriş bilgileri kullanılarak jwt token oluşturulur
    loginService.loginByUsernameAndPassword(userName, userPassword).then(result => {
      console.log(result.data)

      const token = result.data;  //get token
      console.log("token: " + token)

      //tokenı ve username daha sonra kullanmak için localStorage de saklıyorum
      localStorage.setItem("token", token);  //set JWT token to local     
      localStorage.setItem("username", userName);

      //request olumlu sonuçlanırsa kullanıcı giriş yapar ve anasyafaya yönlendirilir.
      toast.success(`${userName} giriş yaptı `)
      navigate("/home")

    }).catch(error => {
      toast.error("Kullanıcı adınızı ve şifrenizi kontrol ediniz!!");
    })

  }

  //session is open? eğer localstorage de username ve token varsa kullanıcı direkt anasayfaya yönlendirilir
  useEffect(() => {
    const username = localStorage.getItem("username");
    const stationCode = localStorage.getItem("stationCode");
    const token = localStorage.getItem("token");

    setTimeout(() => {
      questionnairesService.tokenControl().then(result => {

        if (username !== null && token !== null && result.data === true) {
          navigate("/home");
        }
      }).catch(error => {
        //console.log(error)
      })
    }, 10);

  }, []);

  return (

    <div style={{ width: '100vw', height: '555px', textAlign: 'center', marginTop: '10px' }}>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '300px' }}>
        <img src={anketImage} alt="My Image" />
      </div>

      <div>
        <Input style={{ width: '370px' }}
          placeholder='Kullanıcı Adınızı Giriniz'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Input style={{ width: '370px' }}
          placeholder='Şifrenizi Giriniz'
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '15px' }}>
        <Button type="submit" onClick={loginHandleClick} inverted color='blue'>Giriş</Button>
      </div>

    </div>
  );
}