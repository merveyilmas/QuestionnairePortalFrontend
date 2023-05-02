//Merve Yılmaz, 01.05.2023

import React, { useState, useEffect } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'
import QuestionnairesService from '../../services/QuestionnairesService';
import { toast } from "react-toastify";

// bu sayfa oluşturulan anketleri cevaplama sayfasıdır
export default function Questionnaires() {

    const questionnairesService = new QuestionnairesService()    

    // verileri tutmak için ilgili değişkenleri tanımladım.
    const [titles, setTitles] = useState([]);
    const [title, setTitle] = useState('');

    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});

    const [showSaveButton, setShowSaveButton] = useState(false);

    //anket başlıklarını döndürdüm
    useEffect(() => {
        questionnairesService.getTitlesOfQuestionnaires().then(result => setTitles(result.data))
    }, [])

    //dropdowndan anket başlığı seçildiğinde bu fonksiyon çalışır
    const titlesHandleChange = (e, data) => {

        const title = data.value
        setTitle(title)

        if (title === "") {
            setSelectedOptions({})
            setTitle("")
            setQuestions([])
            setShowSaveButton(false)
        } else {
            setShowSaveButton(true)
        }

        setSelectedOptions({})
    };

    //dropdownda listelemek için options oluşturdum
    let titlesOptions = []

    titlesOptions = titles.map((title) => ({
        key: title,
        text: title,
        value: title,
    }))

    //seçilen anket başlığına göre anket soruları ve seçenekleri döndürülür
    useEffect(() => {

        if (title !== "" && title !== undefined && title !== null) {
            questionnairesService.getQuestionnaireByTitle({ title }).then(result => {
                console.log("title: " + result.data.data.title)
                console.log("questions: " + result.data.data.questions)
                setQuestions(result.data.data.questions)
            }
            ).catch(error => {
                console.error("error: " + error)
                //toast.error("Bir hata oluştu, anket kaydedilemedi!!!");
            })
        }

    }, [title])

    //seçilen anket seçenekleri değişkene atanır
    const handleOptionChange = (questionId, option) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionId]: option
        }));
    };

    //anket sonuçlaırnı kaydetmek için tanımlanan butona tıklanıldığında bu fonksiyon çalışır ve anket sonuçları veri tabanına kaydedilir
    const saveQuestionnaireAnswers = async () => {

        if (selectedOptions !== null && selectedOptions !== undefined && selectedOptions !== "") {

            // console.log("questions length: " + questions.length)
            //console.log("answers length: " + Object.entries(selectedOptions).length);

            if (Object.entries(selectedOptions).length !== questions.length) {

                toast.error("Tüm soruları cevapladığınızdan emin olunuz!!!");

            } else if (Object.entries(selectedOptions).length === questions.length) {

                const username = localStorage.getItem("username");
                console.log("username: " + username)

                Object.entries(selectedOptions)
                    .filter(([questionId, option]) => option !== "")
                    .map(([questionId, option]) => {

                        questionnairesService.saveUserAnswer(username, questionId, option).then(result => {
                            console.log("result: " + result.data)

                            if (result.data === "") {
                                toast.error("Bu anketi zaten cevaplamışsınız, tekrar cevaplayamazsınız!!!");
                                return

                            } else {
                                toast.success(`Cevaplar kaydedildi.`)
                            }
                        }
                        ).catch(error => {
                            console.error("error: " + error)
                            toast.error("Bir hata oluştu, anket cevapları kaydedilemedi!!!");
                        })
                    });
            }

        }

    };

    return (
        <div >
            <div style={{ margin: '0 auto', width: '600px', marginTop: '80px' }}>
                <Dropdown
                    placeholder='Select Questionnaire'
                    fluid
                    search
                    selection
                    clearable
                    options={titlesOptions}
                    value={title}
                    onChange={titlesHandleChange}
                />
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <label style={{ marginRight: '10px', fontSize: '30px' }}><strong>{title}</strong></label>
            </div>

            <div style={{ margin: '0 auto', width: '1000px', marginTop: '20px' }}>

                {questions.map((question, index) => (

                    <div style={{ marginTop: '30px' }} key={question.id}>
                        <h3>{`${index + 1}.  ${question.question_text}`}</h3>
                        {question.options.map(option => (

                            <div style={{ marginTop: '10px', marginLeft: '20px' }} key={option}>

                                <input
                                    type="radio"
                                    id={`q${question.id}-o${option}`}
                                    name={`question-${question.id}`}
                                    value={option}
                                    checked={selectedOptions[question.id] === option}
                                    //onChange={() => handleOptionChange(question.id, option)}
                                    onChange={() => handleOptionChange(question.id, option)}
                                    style={{ marginRight: '5px' }}
                                />
                                <label htmlFor={`q${question.id}-o${option}`}>{option}</label>

                            </div>

                        ))}
                    </div>

                ))}

            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px', marginTop: '30px' }}>
                {showSaveButton &&
                    <Button
                        inverted color='blue'
                        content='Save Questionnaire Answer'
                        labelPosition='center'
                        icon='edit'
                        onClick={saveQuestionnaireAnswers}
                        style={{ marginTop: '10px', width: '500px' }}
                    />}
            </div>

        </div>
    )
}
