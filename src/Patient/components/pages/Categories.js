import React, { useRef, useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'; // Import icons
import records from '../data/categories.json';
import Card from 'react-bootstrap/Card';
import logo from '../image/logo.webp';
import '../css/categories.css';

function Categories() {
    const containerRef = useRef(null);
    const cardWidth = 200; // Width of each card
    const scrollSpeed = 0.7; // Adjust the scrolling speed as needed
    const autoScrollDelay = 4000; // Time between automatic scrolls (3 seconds)

    const [isAutoScrolling] = useState(true);

    useEffect(() => {
        let animationFrameId;
        const container = containerRef.current;

        const scroll = () => {
            if (!isAutoScrolling || !container) {
                return;
            }

            container.scrollLeft += scrollSpeed;

            if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                container.scrollLeft = 0;
            }

            animationFrameId = requestAnimationFrame(scroll);
        };

        const handleAutoScroll = () => {
            if (isAutoScrolling) {
                animationFrameId = requestAnimationFrame(scroll);
            }
        };

        const autoScrollInterval = setInterval(handleAutoScroll, autoScrollDelay);

        return () => {
            clearInterval(autoScrollInterval);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isAutoScrolling]);


    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= cardWidth;
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += cardWidth;
        }
    };

    return (
        <>
        <div className='container-sm d-flex justify-content-center align-items-center'>

                <div className='icon-container' onClick={scrollLeft}>
                    <FaAngleLeft className='icon' />
                </div>
                <div className='scroll-container' ref={containerRef}>
                    {records.map((record, index) => (
                        <div className='card-cat' key={index}>
                            <Card style={{
                                boxShadow: ' 2px 2px 3px rgba(0, 0, 0, 0.5)',
                                fontFamily: `'Oswald', sans-serif'`,
                                width: '7rem', height: '5.5rem', margin: '2vh',
                                background:'white'
                            }}>
                                <Card.Img variant="top" src={logo} style={{ height: '2rem', width: '2rem' }} />
                                <Card.Body style={{ padding:'0', margin:'0', width:'100%'}}>
                                    <Card.Title style={{ color: '#135078', alignContent: 'center',padding:'0',margin:'0', fontSize: '10px'}}>
                                        {record.title}
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className='icon-container' onClick={scrollRight}>
                    <FaAngleRight className='icon' />
                </div>

            </div>
        </>
    );
}

export default Categories;
