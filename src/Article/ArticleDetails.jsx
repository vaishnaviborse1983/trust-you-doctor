import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../Patient/components/pages/Navbar';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom'; // Import useParams from 'react-router-dom'
import medicine from './image/medicine.jpg';
import vitamin from './image/vitamin.jpg';
import ozmed from './image/B12.jpg';
import blood from './image/blood2.jpg';
import heart from './image/heart.jpg';


const ArticleDetails = () => {
    const { type } = useParams(); // Get the type from the URL params

    // Map the type to the corresponding data
    const dataMap = {
        medicine: {
            image: medicine,
            heading: "Can drinking this 'medicine' 3 times a week reverse aging?",
            text: "The hunt for age-defying cures has taken an interesting turn in the quest for eternal youth. These days, resveratrol - a naturally occurring substance present in some plants and known for its possible anti-aging and health-promoting qualities - is the talk of the town. There are various researchers who have done research on this topic, from Harvard, John Hopkins Medicine. Researchers at Harvard Medical School have discovered a clear connection between improved health and a longer life span and red wine's mystical component resveratrol as well as the SIRT1 gene. Can this 'medicine' actually stop aging, though? Here are the possible advantages of resveratrol and the science underlying it.",
        },
        B12: {
            image: ozmed,
            heading: 'Vitamin B12 deficiency signs that are mostly ignored​',
            text: `Vitamin B12 plays a crucial role in various bodily functions, including red blood cell formation, neurological health, and DNA synthesis. Since the body cannot produce B12 on its own, it must be obtained through diet or supplements. Ignoring signs of B12 deficiency can lead to serious health issues over time. Here are a few signs of Vitamin B12 deficiency identifying which is essential.
            Persistent fatigue and weakness are common early signs of Vitamin B12 deficiency, as the vitamin is essential for energy production in the body. Fatigue is a symptom that can be attributed to various factors, and individuals often dismiss it as a consequence of a busy lifestyle, stress, or lack of sleep.
            
            Vitamin B12 is crucial for maintaining healthy nerve cells. Deficiency can result in neurological symptoms such as numbness, tingling, and difficulty walking. Neurological symptoms may develop gradually and be mistaken for other conditions, leading to delayed diagnosis and treatment.
            
            Vitamin B12 deficiency can impact cognitive function, leading to memory loss, difficulty concentrating, and mood changes. Cognitive changes may be attributed to aging or stress, and individuals may not immediately connect them to a nutritional deficiency.`,
        },

        ozempic: {
            image: vitamin,
            heading: "FDA says it's seized 'thousands of units' of counterfeit Ozempic.",
            text: `The US Food and Drug Administration warned Thursday that it's seized "thousands of units" of counterfeit versions of the type 2 diabetes drug Ozempic from the US drug supply chain, and it's urging suppliers, pharmacies and patients to use caution. Five people have gotten sick in connection with the products, but none of the cases has been serious, the FDA said.
            
          The FDA warns pharmacies, health care systems, wholesalers and patients to double-check their semaglutide products to make sure they are the real thing. One-milligram injectable Ozempic products with the lot number NAR0074 and serial number 430834149057 on the box should not be used.
          
          The agency and drugmaker Novo Nordisk are testing the fakes to determine whether they're dangerous and to identify what the substance is. The pen label, carton, information for patients and health care professionals, and needles that come with the injectors are also counterfeit, the FDA said. The needles' sterility can't be confirmed, so using them could lead to infection.
          
          The FDA reminded patients to get their medication only through state-licensed pharmacies with a valid prescription.
          
          Ozempic has been in shortage since a boom in popularity among celebrities who used it to lose weight. Since the popularity of Ozempic and its sister medication for weight loss, Wegovy, have grown, there have been reports of people selling knockoff versions at salons and through social media.`,
        },
        // Add similar entries for other articles


        blood: {
            image: blood,
            heading: 'Blood, Blood Products and Products of Human Origin :',
            text: `An insufficient or unsafe blood supply for transfusion has a negative impact on the effectiveness of key health services and programmes to provide appropriate patient care in numerous acute and chronic conditions. Ensuring access of all patients who require transfusion to safe, effective and quality-assured blood products is a key component of an effective health system and vital for patient safety. A blood product is any therapeutic substance derived from human blood, including whole blood and other blood components for transfusion, and plasma-derived medicinal products.
            Medicinal (medical therapeutic) products derived from human donations of blood and plasma play a critical role in health care. Safe, effective and quality-assured blood products contribute to improving and saving millions of lives every year, as they:
            address child mortality and maternal health;
            
            dramatically improve the life expectancy and quality of life of patients suffering from life-threatening inherited disorders, such as haemophilia, thalassaemia and immune deficiency, and acquired conditions such as cancer and traumatic haemorrhage and
            
            support complex medical and surgical procedures, including transplantation.
            
            An insufficient or unsafe blood supply for transfusion has a negative impact on the effectiveness of key health services and programmes to provide appropriate patient care in numerous acute and chronic conditions. Ensuring access of all patients who require transfusion to safe, effective and quality-assured blood products is a key component of an effective health system and vital for patient safety.`,
        },
        heart: {
            image: heart,
            heading: 'Cardiovascular diseases',
            text: `Cardiovascular diseases (CVDs) are a group of disorders of the heart and blood vessels, including coronary heart disease, cerebrovascular disease, peripheral arterial disease, rheumatic heart disease, congenital heart disease, deep vein thrombosis and pulmonary embolism. An estimated 17.9 million people died from CVDs in 2016, representing 31% of all global deaths. Of these deaths, 85% were due to heart attack and stroke.

            Over 75% of CVD deaths take place in low- and middle-income countries where raised blood pressure happens to be amongst the most important risk factors for CVDs.  In 2016 India reported 63% of  total deaths due to NCDs, of which 27% were attributed to CVDs. CVDs also account for 45% of deaths in the 40-69 year age group.
       
            Individuals at risk of CVD may demonstrate raised blood pressure, glucose, and lipids as well as overweight and obesity. Identifying those at highest risk of CVDs and ensuring they receive appropriate treatment can prevent premature deaths. Access to essential NCD medicines and basic health technologies in all primary health care facilities is essential to ensure that those in need receive treatment and counselling.`
        },
    };

    // Get the data based on the selected type
    const selectedData = dataMap[type];

    if (!selectedData) {
        // Handle invalid or unknown types
        return <div>Invalid type</div>;
    }

    return (
        <div>
            <Navbar />
            <div className='container-fluid mt-4'>
                <img src={selectedData.image} className='img-fluid' style={{ height: '50vh', width: '100vw' }} alt={type} />
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <h1 style={{ color: 'red', marginTop: '6vh' }}>{selectedData.heading}</h1>
                </div>
                <div className='w-75 mx-auto' style={{ whiteSpace: 'pre-line' }}>
                    <p style={{ color: 'black', fontSize: '3vh', fontWeight: 'normal' }}>{selectedData.text}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ArticleDetails;

