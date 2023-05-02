//Merve Yılmaz, 01.05.2023

import axios from "axios"

const token = localStorage.getItem("token");
console.log("token from questionnaire service: " + token)

const ipAdress = "localhost"
const port = "8080"

//anket sayfalarında kullanılan sorgular bu service de tanımlandı
export default class QuestionnairesService {

    tokenControl() {
        return axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/UsersController/tokenControl`,
            headers: { 'Authorization': 'Bearer ' + token }
        }).catch(function (error) {
            //console.log(error);
        });
    }

    saveQuestionnaire({ title, questions }) {
        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/questionnairesController/createQuestionnaire`,
            headers: { 'Authorization': 'Bearer ' + token },
            data: { title, questions }
        }).catch(function (error) {
            //console.log(error);
        });
    }

    getQuestionnaireByTitle( {title} ) {
        return axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/questionnairesController/getQuestionnaireByTitle?title=${title}`,
            headers: { 'Authorization': 'Bearer ' + token }
        }).catch(function (error) {
            //console.log(error);
        });
    }

    getTitlesOfQuestionnaires() {
        return axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/questionnairesController/getAllTitlesOfQuestionnaires`,
            headers: { 'Authorization': 'Bearer ' + token }
        }).catch(function (error) {
            //console.log(error);
        });
    }

    saveUserAnswer(username, questionId, answer) {
        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/questionnaireAnswersController/saveAnswers?username=${username}&questionId=${questionId}&answer=${answer}`,
            headers: { 'Authorization': 'Bearer ' + token }
        }).catch(function (error) {
            //console.log(error);
        });
    }

    getOptionCountByOptionTextAndQuestionId(optionText, questionId) {
        return axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/optionsController/getOptionCountByOptionTextAndQuestionId?option=${optionText}&questionId=${questionId}`,
            headers: { 'Authorization': 'Bearer ' + token }
        }).catch(function (error) {
            //console.log(error);
        });
    }

}