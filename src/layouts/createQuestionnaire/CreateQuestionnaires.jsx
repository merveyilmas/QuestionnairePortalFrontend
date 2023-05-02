//Merve Yılmaz, 01.05.2023

import React, { useState, useEffect } from 'react'
import { Input, Button, Icon } from 'semantic-ui-react'
import QuestionnairesService from '../../services/QuestionnairesService';
import { toast } from "react-toastify";

export default function CreateQuestionnaires() {

    // bu sayfa anket oluşturma sayfasıdır

    const questionnairesService = new QuestionnairesService()
    
    // anketin başlığını ve soruları tutmak için değişken tanımladım
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { question_text: '', options: [''] }
    ]);

    // soru yazdığınızda bu fonksiyon çalışır
    const handleQuestionChange = (index, event) => {
        const values = [...questions];
        values[index].question_text = event.target.value;
        setQuestions(values);
    };

    // seçenekleri değiştirfiğinizde bu fonksiyon çalışır
    const handleOptionChange = (qIndex, oIndex, event) => {
        const values = [...questions];
        values[qIndex].options[oIndex] = event.target.value;
        setQuestions(values);
    };

    // yeni bir soru için ekleme butonuna tıkladığınızda bu fonksiyon çalışır
    const handleAddQuestion = () => {
        const values = [...questions];
        values.push({ question_text: '', options: [''] });
        setQuestions(values);
    };

    // yeni bir seçenek ekleme butonuna tıklandığında bu fonksiyon çalışır
    const handleAddOption = (index) => {
        const values = [...questions];
        values[index].options.push('');
        setQuestions(values);
    };

    // soru silme butonuna tıkladığınızda bu fonksiyon çalışır
    const handleRemoveQuestion = (index) => {
        const values = [...questions];
        values.splice(index, 1);
        setQuestions(values);
    };

    // seçenek silme butonuna tıkladığınızda bu fonksiyon çalışır
    const handleRemoveOption = (qIndex, oIndex) => {
        const values = [...questions];
        values[qIndex].options.splice(oIndex, 1);
        setQuestions(values);
    };

    const saveQuestionnaire = async () => {


        const result = await questionnairesService.getQuestionnaireByTitle({ title });
        console.log("result: " + result.data.data)

        if (result.data.data === null) {

            questionnairesService.saveQuestionnaire({ title, questions }).then(result => {
                console.log("result: " + result.data)
                toast.success(`Anket oluşturuldu.`)
            }
            ).catch(error => {
                console.error("error: " + error)
                toast.error("Bir hata oluştu, anket kaydedilemedi!!!");
            })

        } else {
            toast.error("Aynı anket başlığı mevcut, lütfen başlığı değiştiriniz!!");
        }


    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '1000px', marginTop: '25px' }}>
                <div>
                    <label style={{ marginRight: '10px' }}><strong>Başlık Giriniz:</strong></label>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '805px' }}
                    />
                </div>

                {questions.map((q, qIndex) => (
                    <div style={{ marginTop: '25px' }} key={qIndex}>
                        <div>
                            <label style={{ marginRight: '50px' }}><strong>Soru {qIndex + 1}:</strong></label>
                            <Input
                                type="text"
                                name="questionText"
                                value={q.question_text}
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                style={{ marginRight: '5px', width: '800px' }}
                            />
                            <Button
                                inverted color='red'
                                icon
                                onClick={() => handleRemoveQuestion(qIndex)}>
                                <Icon name='remove' />
                            </Button>
                        </div>

                        <div>
                            {q.options.map((o, oIndex) => (
                                <div style={{ marginTop: '5px' }} key={oIndex}>
                                    <label style={{ marginRight: '10px' }}><strong>Seçenek {oIndex + 1}:</strong></label>
                                    <Input
                                        type="text"
                                        name="option_text"
                                        value={o}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                        style={{ marginRight: '5px', width: '815px' }}
                                    />
                                    <Button
                                        inverted color='red'
                                        icon
                                        onClick={() => handleRemoveOption(qIndex, oIndex)}>
                                        <Icon name='remove' />
                                    </Button>
                                </div>
                            ))}

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    inverted color='blue'
                                    onClick={() => handleAddOption(qIndex)}
                                    style={{ with: '200px', marginTop: '5px' }}
                                    content='Seçenek ekle'
                                />
                            </div>

                        </div>
                    </div>
                ))}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        inverted color='blue'
                        onClick={handleAddQuestion}
                        content='Soru Ekle'
                        style={{ width: '300px', marginTop: '20px' }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
                    <Button
                        inverted color='blue'
                        content='Anketi Kaydet'
                        labelPosition='center'
                        icon='edit'
                        onClick={saveQuestionnaire}
                        style={{ marginTop: '10px', width: '500px' }}
                    />
                </div>
            </div>
        </div>

    );
}