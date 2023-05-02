//Merve Yılmaz, 01.05.2023

import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Navi from '../layouts/Navi'
import { Grid, Container } from 'semantic-ui-react'
import QuestionnairesPage from '../layouts/questionnaires/Questionnaires'

//anket cevaplama sayfası dashboardu
export default function QuestionnairesDashboard() {

  const navigate = useNavigate();

  //token ve username
  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (username === null || token === null) {
      navigate("/");
    }
  }, []);

  return (

    <div style={{ width: '100vw', height: '100%' }} >
      <Container className="main">
        <Navi />
      </Container>

     <QuestionnairesPage/>

    </div>

  )
}
