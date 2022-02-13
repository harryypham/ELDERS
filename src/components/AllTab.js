import React, {useRef} from 'react';
import "./css/AllTab.css"
export default function AllTab() {
    let allTab = useRef(null);
    return (
        <section className="bg-container" ref={allTab}>
            <div id="main">
                <section className="tab-container">
                    <div className="tab-content">
                        <h1 className="text-gradient-orange">Family &amp; Friends</h1>
                        <p>Remember! You are never alone! Family &amp; Friends will remind you of your beloved persons in your life. Let's share with us each person in your family and your friends! You will realize how much you love and be loved. </p>
                    </div>
                    <div className="tab-image">
                        <img src="https://earrialk.sirv.com/258881709_188217603526787_9102542577401788533_n.png" alt=""></img>
                    </div>
                </section>
                <section className="tab-container">
                    <div className="tab-image">
                            <img src="https://earrialk.sirv.com/258861528_686243336072492_5112780653209313211_n.png" alt=""></img>
                    </div>
                    <div className="tab-content">
                        <h1 className="text-gradient-pink">Bucket Lists and Inspiration</h1>
                        <p>Let's come up with some gratifying activities that you want to do with your family and friends. List them out on your Bucket List to get them done! <br></br> If you are out of ideas, don't worry, we got you! Dive into our Inspirations to see our cool videos from YouTube and interesting articles! Those links will help you figure out your passions!</p>
                    </div>
                </section>
                <section className="tab-container">
                    <div className="tab-content">
                        <h1 className="text-gradient-brown">Diary</h1>
                        <p>Emotions are an important part of our lives. Spend some time for your own reflection! If you are afraid of losing your notes or a piece of paper, don’t be panic, we serve you a little technical diary to express your feelings every day, every time, and every moment!  </p>
                    </div>
                    <div className="tab-image">
                        <img src="https://earrialk.sirv.com/259323948_830911821642021_4823926129035727345_n.png" alt=""></img>
                    </div>
                </section>
                <section className="tab-container">
                    <div className="tab-image">
                            <img src="https://earrialk.sirv.com/263463238_341144214588678_231059051498976840_n.png" alt=""></img>
                    </div>
                    <div className="tab-content">
                        <h1 className="text-gradient-blue">Testament</h1>
                        <p>“To the well-organized mind, death is but the next great adventure.” - J. K. Rowling. We are here to help you organize everything and be well-prepared. You are all superheroes! We are blessed to be part of your nearing end-of-life journey. Leave the greatest love to your family and friends in this testament. It will be delivered to them! </p>
                    </div>
                </section>
            </div>
        </section>
    )
}