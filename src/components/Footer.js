import React from "react";
import "./css/Footer.css"
export default function Footer() {
    return (
        <section id="bg-footer-container">
            <div id="logo">
                <img src="img/icon.png" width="150" height="150" alt=""></img>
            </div>
            <div id="footer-nav" className="d-flex justify-content-start align-items-start me-5 pe-4 mt-12">
                <div className="footer-nav-ele"><a href="/">About Us</a></div>
                <div className="footer-nav-ele"><a href="/family">Family</a></div>
                <div className="footer-nav-ele"><a href="/friends">Friends</a></div>
                <div className="footer-nav-ele"><a href="/bucket-list">Bucket List</a></div>
                
            </div>
            <div id="footer-nav" className="d-flex justify-content-start align-items-start mt-12">
                <div className="footer-nav-ele"><a href="/inspiration">Inspiration</a></div>
                <div className="footer-nav-ele"><a href="/diary">Diary</a></div>
                <div className="footer-nav-ele"><a href="/testament">Testament</a></div>
            </div>
            <div id="subscribe-form">
                <h2>Subscribe to our membership</h2>
                <input type="email" placeholder="Enter your email"></input>
                <button type="button" className="tw-purple">Subscribe</button>
            </div>
        </section>
    )
}