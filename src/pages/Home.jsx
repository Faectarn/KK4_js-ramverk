import React from 'react'
import { Link } from "react-router-dom";
import '../style/Home.css';

function Home() {
    return (
        <main className='main-home'>
            <h1 className='h1-home'>
                Välkommen till Webgiganten! Här finns allt möjligt du kan tänkas behöva.
            </h1>
            <button className='button-home'><Link to="/products">Gå till produktsidan</Link></button>
            <img src="https://i2.wp.com/ullbutiken.com/wp-content/uploads/2015/12/online-shopping-ecommerce-ss-1920.png?resize=510%2C287" />
        </main>
    )
}

export default Home