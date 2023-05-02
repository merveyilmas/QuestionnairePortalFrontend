//Merve Yılmaz, 01.05.2023

import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { Container } from 'semantic-ui-react'
import Navi from '../layouts/Navi'
import CreateQuestionnairePage from '../layouts/createQuestionnaire/CreateQuestionnaires';

//anket oluşturma sayfası dashboardu
export default function CreateQuestionnaireDashboard() {

    const navigate = useNavigate();

    //token ve username kontrol edilir
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
            <CreateQuestionnairePage></CreateQuestionnairePage>

        </div>

    );


}