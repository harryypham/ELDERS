import './css/Card.css';
import React, {useRef, useEffect} from 'react';
import VanillaTilt from 'vanilla-tilt';

export default function Card() {
    let a = useRef(null);
    useEffect(() => {
        VanillaTilt.init(document.querySelectorAll(".card-content"),{
            glare: true,
            reverse: true,
            "max-glare": 0.5,
            
        });
    })
    return (
        <section className="card-container test" id="first" ref={a}>
            <h1>Features</h1>
            <div id="first-row">
                <div className="card-content">
                    <div className="card-image card1" ></div>
                    <div className="card-text card1">
                    <h2>About Us</h2>
    
                    </div>
                    
                </div>
                <div className="card-content">
                    <div className="card-image card2"></div>
                    <div className="card-text card2">
                    <h2>Family &amp; Friends</h2>
                    </div>
                    
                </div>
                <div className="card-content">
                    <div className="card-image card3"></div>
                    <div className="card-text card3">
                        <h2>Bucket List &amp; Inspiration</h2>
                       
                    </div>
                    
                </div>
            </div>
            <div id="second-row">
            <div className="card-content">
                    <div className="card-image card4" ></div>
                    <div className="card-text card4">
                    <h2>Diary</h2>
                    
                    </div>
                    
                </div>
                <div className="card-content">
                    <div className="card-image card5"></div>
                    <div className="card-text card5">
                    <h2>Testament</h2>
                    
                    </div>
                    
                </div>
            </div>
        </section>
    )
}
