import React, { useState } from 'react';
import './Articles.css';
import CardItem from './CardItem';
import AutoPlay from "./AutoPlay";
import { Link } from 'react-router-dom';


function Articles() {
    const [click, setClick] = useState(false);

    const closeMobileMenu = () => setClick(false);
    return (
        // <div className='article-container'>
        // <div className='cards' style={{ backgroundColor: '#244682' }}>
        <>
            <div className='cards' style={{ backgroundColor: '#244682' }}>
                <div className='blog'>
                <Link
                to='/blog'
                // onClick={closeMobileMenu}
              >
                <h1>Blog Posts</h1>
              </Link>
                    
                    <p>Enjoy the Best Things You Can Do And See In Tirana.</p>
                </div>
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                        <ul className='cards__items'>
                            <CardItem
                                src='images/hub3.png'
                                title="Innovation Hubs"
                                description="Public Centers for Start Ups."
                                // label='Mystery'
                                path='/services'
                            />
                            <CardItem
                                src='images/Festival5.png'
                                title="Youth Arts Festivals"
                                description="Series of Festive events in Tirana."
                                // label='Adventure'
                                path='/products'
                            />
                            <CardItem
                                src='images/Bovilla2.jpg'
                                title="Daily Escapes in Nature"
                                description="Lake Bovilla, wonderful outdoor day trip."
                                // label='Adrenaline'
                                path='/sign-up'
                            />
                        </ul>
                    </div>
                </div>

            </div>
            <div className='partners'>
                <h1 style={{fontSize: "3rem"}}>Our Partners</h1>
                <p>They Will Talk About Us.</p>
            </div>
            <AutoPlay />
        </>
    );
}

export default Articles;
