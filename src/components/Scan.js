import './css/Scan.css'
import React, {useRef, useEffect} from 'react';
import gsap from "gsap";
import ScrollMagic from 'scrollmagic';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import {useNavigate} from "react-router-dom"



 
ScrollMagicPluginGsap(ScrollMagic, gsap);


export default function Scan() {
    const navigate = useNavigate();
    let a = useRef(null);
    function navigateLogin() {
        navigate("/login")
    }
    useEffect(() => {
        var controller = new ScrollMagic.Controller({addIndicators: true});
        //gsap.fromTo(".scan-circle", {width: "20vw", height: "20vw", duration: 0.75}, {width: "22.5vw", height: "22.5vw", ease:"none", repeat:-1, yoyo:true});
        // /gsap.fromTo(".scan-circle", {scale: 2, duration: 0.75}, {scale: 2.5, ease: "none", repeat:-1, yoyo:true});
        //gsap.fromTo(".img-btn-container", {scale: 0.5, duration: 0.75}, {scale: 0.4, ease: "none", repeat:-1, yoyo:true});
        var timeline = gsap.timeline();
        var timeline1 = gsap.timeline();

        var foot1 = gsap.to("#foot1", {opacity: 1, delay: 0, duration: 0.2});
        var foot2 = gsap.to("#foot2", {opacity: 1, delay: 0, duration: 0.2});
        var foot3 = gsap.to("#foot3", {opacity: 1, delay: 0, duration: 0.2});
        var foot4 = gsap.to("#foot4", {opacity: 1, delay: 0, duration: 0.2});
        var foot5 = gsap.to("#foot5", {opacity: 1, delay: 0, duration: 0.2});
        var foot6 = gsap.to("#foot6", {opacity: 1, delay: 0, duration: 0.2});
        timeline.add(foot1).add(foot2).add(foot3).add(foot4).add(foot5).add(foot6)

        var h1 = gsap.from(".scan-title h1", {opacity: 0, delay: 0, duration: 0.5, y: window.innerHeight/2});
        var p = gsap.from(".scan-title p", {opacity: 0, delay: 0, duration: 0.3, y: window.innerHeight/2});
        var button = gsap.from(".scan-title button", {opacity: 0, delay: 0, duration: 0.2, y: window.innerHeight/2});
        timeline1.add(h1).add(p).add(button);
        function setAnimation() {
            new ScrollMagic.Scene({
                triggerElement: ".scan-wrapper",
                triggerHook: 1, // show, when scrolled 10% into view
                duration: window.innerHeight * 0.25, // hide 10% before exiting view (80% + 10% from bottom)
                offset: window.innerHeight * 0.95 // move trigger to center of element
            })
                .setClassToggle(".img-btn-container", "visible") // add class to reveal
                .addIndicators() // add indicators (requires plugin)
                .addTo(controller);

            new ScrollMagic.Scene({
                triggerElement: ".scan-wrapper",
                triggerHook: 1,
                offset: window.innerHeight * 0.9
            })
                .setTween(timeline)
                .addIndicators() // add indicators (requires plugin)
                .addTo(controller);

            new ScrollMagic.Scene({
                triggerElement: ".scan-wrapper",
                triggerHook: 1,
                offset: window.innerHeight * 0.6
            })
                .setTween(timeline1)
                .addIndicators() // add indicators (requires plugin)
                .addTo(controller);
        }    
        setAnimation()
        window.addEventListener("resize",() => {
            setAnimation();
        })        


        gsap.set(".scan-circle", {xPercent: -50, yPercent: -50});
        ///
        var ball = document.querySelector(".scan-circle");
        var ball1 = document.querySelector(".img-btn-wrapper");
        var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        var pos1 = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        var mouse = { x: pos.x, y: pos.y };
        var mouse1 = { x: pos.x, y: pos.y };
        var speed = 0.1;

        var fpms = 60 / 1000;

        var xSet = gsap.quickSetter(ball, "x", "px");
        var ySet = gsap.quickSetter(ball, "y", "px");
        var x1Set = gsap.quickSetter(ball1, "x", "px");
        var y1Set = gsap.quickSetter(ball1, "y", "px");

        window.addEventListener("mousemove", e => {    
        mouse.x = e.x;
        mouse.y = e.y;  
        mouse1.x = e.x;
        mouse1.y = e.y;  
        });



        gsap.ticker.add((time, deltaTime) => {
        
        var delta = deltaTime * fpms;
        var dt = 1.0 - Math.pow(1.0 - speed, delta); 
        
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        pos1.x += (mouse1.x - pos1.x) * dt;
        pos1.y += (mouse1.y - pos1.y) * dt;
        xSet(pos.x);
        ySet(pos.y);
        x1Set(-pos1.x);
        y1Set(-pos1.y);

        
        });

        // special thanks to Blake Bowen for most of the code.


    })
    return (
        <section className="scan-container test">
            <div className="scan-content-container">
                <div className="scan-title">
                    <h1>Plan Your Journey</h1>
                    <p>Travel with us on the journey to fight stress and pursue happiness" to “Let’s flash your life to make it shine!</p>
                    <button type="button" className="mt-4" onClick={navigateLogin}>Start</button>
                </div>
                <div className="scan-footprint">
                    <img src="/img/foot1.png" alt="" className="foot1" id="foot1" />
                    <img src="/img/foot2.png" alt="" className="foot2" id="foot2" />
                    <img src="/img/foot1.png" alt="" className="foot1" id="foot3" />
                    <img src="/img/foot2.png" alt="" className="foot2" id="foot4" />
                    <img src="/img/foot1.png" alt="" className="foot1" id="foot5" />
                    <img src="/img/foot2.png" alt="" className="foot2" id="foot6" />
                    <img src="/img/foot1.png" alt="" className="foot1" id="foot7" />
                    <img src="/img/foot2.png" alt="" className="foot2" id="foot8" />
                    <img src="/img/foot1.png" alt="" className="foot1" id="foot9" />
                    <img src="/img/foot2.png" alt="" className="foot2" id="foot10"/>
                    <img src="/img/foot1.png" alt="" className="foot1" id="foot11" />
                    <img src="/img/foot2.png" alt="" className="foot2" id="foot12"/>
                    <img src="/img/foot1.png" alt="" className="foot1" id="foot13" />
                </div>
            </div>
            <div className="scan-wrapper"  ref={a}>
                <div className="scan-circle-container">
                    <div className="scan-circle" >
                        <div className="img-btn-wrapper">
                            <div className="img-btn-container">
                                <img src="/img/scan-gif-3.gif" alt="img" />
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </section>
    )
}