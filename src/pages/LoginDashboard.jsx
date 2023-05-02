//Merve Yılmaz, 01.05.2023

import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "../layouts/Login";
import { ToastContainer } from "react-toastify";
import HomeDashboard from './HomeDashboard';
import QuestionnairesDashboard from './QuestionnairesDashboard';
import CreateQuestionnaireDashboard from './CreateQuestionnaireDashboard';
import QuestionnaireAnswersDashboard from './QuestionnaireAnswersDashboard';

//login sayfası dashboardu
export default function LoginDashboard() {
//router ile sayfa yönlendirmeleri tanımlandı
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route exact path="/home" element={<HomeDashboard />} />
        <Route exact path="/questionnaires" element={<QuestionnairesDashboard />} />
        <Route exact path="/createQuestionnaires" element={<CreateQuestionnaireDashboard />} />
        <Route exact path="/questionnaireAnswers" element={<QuestionnaireAnswersDashboard />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </div>
  );
}
