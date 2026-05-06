import React from 'react';
import img7 from './img7.jpg';
import img3 from './Yoga Classes.jpg'
import img4 from './Yoga Photo 2.jpg'
import Navbar from '../Patient/components/pages/Navbar';
import './YogaImage.css'; // Import a CSS file for your styling
import Carousel from 'react-bootstrap/Carousel';
import Footer from '../Footer/Footer'

const Yoga = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
            <Navbar />
            <div className='image-container' style={{ display: 'flex', alignSelf: 'center' }}>

                <Carousel style={{ margin: '3vh', padding: '2vh', marginBottom: '5vh' }}>
                    <Carousel.Item interval={2000}>

                        <img src={img7} alt='Yoga' />

                    </Carousel.Item>
                    {/* <Carousel.Item interval={2000}>

                        <img src={img2} alt='Yoga Image' />

                    </Carousel.Item> */}
                    <Carousel.Item interval={2000}>

                        <img src={img3} alt='Yoga' />

                    </Carousel.Item>
                    <Carousel.Item interval={2000}>

                        <img src={img4} alt='Yoga' />

                    </Carousel.Item>
                </Carousel>

            </div>
            <Footer />
        </div>
    );
};

export default Yoga;
