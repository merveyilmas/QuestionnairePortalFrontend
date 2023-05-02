//Merve Yılmaz, 01.05.2023

import React, { useState, useEffect } from 'react'
import { Dropdown } from 'semantic-ui-react'
import QuestionnairesService from '../../services/QuestionnairesService';

// bu sayfa oluşturulan anketlerin sonuçlarını gösteren sayfadır
export default function QuestionnaireAnswers() {

    const questionnairesService = new QuestionnairesService()

    // verileri tutmak için değişkenleri tanımladım
    const [titles, setTitles] = useState([]);
    const [title, setTitle] = useState('');

    const [questions, setQuestions] = useState([]);
    const [questionsWithOptionCounts, setQuestionsWithOptionCounts] = useState([]);

    // anket başlıklarını dropdownda listelemek için değişkene atadım
    useEffect(() => {
        questionnairesService.getTitlesOfQuestionnaires().then(result => setTitles(result.data))
    }, [])

    //dropdowndan anket başlığı seçildiğinde bu fonksiyon çalışır
    const titlesHandleChange = (e, data) => {

        const title = data.value
        setTitle(title)

        if (title === "") {
            setTitle("")
            setQuestions([])
        }

    };

    let titlesOptions = []

    //anket başlıklarını dropdownda listelemk için option oluşturdum
    titlesOptions = titles.map((title) => ({
        key: title,
        text: title,
        value: title,
    }))

    useEffect(() => {

        //anket başlığı ile ilgili requestten o ankete ait soruları ve seçenekleri question değişkenine atadım
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

    //bu fonksiyon seçenek ve soru id si ile o seçeneğin seçilme sayısını içeren yeni bir questions objesi döndürür
    const addOptionCountToQuestions = async (questions) => {
        const questionsWithOptionCount = [];

        for (const question of questions) {
            const optionsWithCount = [];

            for (const option of question.options) {
                const count = await questionnairesService.getOptionCountByOptionTextAndQuestionId(option, question.id);
                optionsWithCount.push({ optionText: option, optionCount: count });
            }

            const questionWithOptionCount = {
                id: question.id,
                question_text: question.question_text,
                options: optionsWithCount,
            };

            questionsWithOptionCount.push(questionWithOptionCount);
        }

        return questionsWithOptionCount;
    }

    //her sorular değiştiğinde yeni questions dizisi oluşturulur
    useEffect(() => {
        const addOptionCountToQuestionsAsync = async () => {
            const questionsWithOptionCount = await addOptionCountToQuestions(questions);
            setQuestionsWithOptionCounts(questionsWithOptionCount)
            console.log(questionsWithOptionCount);
        };

        addOptionCountToQuestionsAsync();
    }, [questions]);



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

            <div style={{ margin: '0 auto', width: '1000px', marginTop: '20px', marginBottom: '50px' }}>
                {questionsWithOptionCounts.map((question, index) => (

                    <div style={{ marginTop: '30px' }} key={question.id}>
                        <h3>{`${index + 1}.  ${question.question_text}`}</h3>
                        {question.options.map(option => (

                            <div style={{ marginTop: '10px', marginLeft: '20px' }} key={option.optionText}>
                                <label style={{ marginRight: '10px' }} htmlFor={`q${question.id}-o${option}`}>{option.optionText}</label>
                                <label htmlFor={`q${question.id}-o${option}`}>{'(' + option.optionCount.data + ' kişi)'}</label>
                            </div>

                        ))}
                    </div>

                ))}
            </div>

        </div>
    )
}
