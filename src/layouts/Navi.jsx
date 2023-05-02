//Merve Yılmaz, 01.05.2023

import React, { useState, useEffect } from "react";
import { Container, Menu } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import SignedIn from "./SignedIn";

// bu sayfa her sayfanın üst tarafında bulunan navi bar layoutudur
export default function Navi() {

  const navigate = useNavigate()

  const [isAuthendicated, setIsAuthendicated] = useState(true);

  //çıkış yapma butonuna tıklanıldığında çalışır ve localstorage den değişkenleri siler
  function handleSignOut() {
    setIsAuthendicated(false)
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userTypeId")
    navigate('/')
  }

  //sayfalara yönlendirme butonları
  function handleClickHomepage() {
    navigate('/home')
  }

  function handleClickQuestionnaires() {
    navigate('/questionnaires')
  }

  function handleClickCreateQuestionnaires() {
    navigate('/createQuestionnaires')
  }

  function handleClickQuestionnaireAnswers() {
    navigate('/questionnaireAnswers')
  }  

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>

          <Menu.Item>
            <img alt="logo" src='/favicon.ico' />
          </Menu.Item>

          <Menu.Item name="Anasayfa" onClick={handleClickHomepage} />          
          <Menu.Item name="Anket Oluştur" onClick={handleClickCreateQuestionnaires} />
          <Menu.Item name="Anket Çöz" onClick={handleClickQuestionnaires} />
          <Menu.Item name="Anket Sonuçları" onClick={handleClickQuestionnaireAnswers} />

          <Menu.Menu position="right">
            <SignedIn signedOut={handleSignOut} />
          </Menu.Menu>

        </Container>

      </Menu>
    </div>
  )
}
