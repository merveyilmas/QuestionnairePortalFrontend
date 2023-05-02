//Merve Yılmaz, 01.05.2023

import React, { useState, useEffect } from 'react'
import anketImage from '../../images/anket.jpg';

export default function Homepage() {
//anasayfa tasarımı bu sayfada yapıklmıştır.

    return (
        <div >

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '400px' }}>
                <img src={anketImage} alt="My Image" />
            </div>

            <div style={{ marginLeft: '50px', marginRight: '50px', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '10px', display: 'flex', justifyContent: 'center', }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }} >
                    <span style={{ paddingLeft: '30px', fontWeight: '50px' }} />Anket portalına hoşgeldiniz. Yukarıda görmüş olduğunuz menüden anket oluşturma sayfasına, anket cevaplama sayfasına ve
                    anket yanıtlarının listelendiği sayfaya ulaşabilirsiniz. Dilediğiniz anketleri oluşturup, cevaplayabilirsiniz.
                    Şimdiden iyi eğlenceler...
                </p>
            </div>


        </div>
    )
}
