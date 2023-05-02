//Merve Yılmaz, 01.05.2023

import React, { useEffect, useState, createContext } from 'react'
import { useNavigate } from "react-router-dom";
import { Container } from 'semantic-ui-react'
import Navi from '../layouts/Navi'
import QuestionnairesService from '../services/QuestionnairesService';
import Homepage from '../layouts/homepage/Homepage'

//anasayfa dashboardu
export default function HomeDashboard() {

  const navigate = useNavigate();
  const questionnairesService = new QuestionnairesService()

  //token kontorl edilir 
  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    setTimeout(() => {
      questionnairesService.tokenControl().then(result => {

        // console.log("username: " + username)
        console.log("token: " + token)
         console.log("tokenControl: " + result.data)

        if (username === null || token === null || result.data !== true) {
          navigate("/");
        }

      }).catch(error => {
        //console.log(error)
      })
    }, 5000);

  }, []);

  return (

    <div style={{ width: '100vw', height: '100%' }} >

      <Container className="main">
        <Navi />
      </Container>

      <Homepage />

    </div>

  )
}

