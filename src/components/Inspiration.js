import "bootstrap/dist/css/bootstrap.min.css"
import {Row, Col} from 'react-bootstrap';
import {Link } from "react-router-dom";
import { useRef } from "react";
import './css/Family.css';
import './css/BucketList.css'
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import NavBar from "./NavBar"

defineLordIconElement(loadAnimation);


function Inspiration() {
  const data = {
    "food": {
        name: "Food",
        img: "https://cdn.shopify.com/s/files/1/0529/2461/2804/articles/cheesy-nacho-new-3_1500x.jpg?v=1639402520",
    },
    "travel": {
        name: "Travel",
        img: "https://earrialk.sirv.com/travel.jpeg"
    },
    "daily-routine": {
        name: "Daily Routine",
        img: "https://earrialk.sirv.com/Finger%20Flop%20%5Bprocess%5D.gif"
    },
    "music": {
        name: "Music",
        img: "https://earrialk.sirv.com/ezgif.com-gif-maker%20(1).gif",
    }
  }
  const _ = useRef(null);

    return (
      <div className="vw-100 container-fluid mt-5 mb-3 pt-4 position-relative inspiration-bg-container" ref={_}>
        <NavBar />
        <h1 className="text-uppercase">Inspiration</h1>
        <Row xs={1} md={2} className="g-2">
          {Object.keys(data).map((key, idx) => (
            <Col>
              <Link to={`/inspiration/${key}`} className="btn">
                <div className="topic-container" >
                  <div className="topic-content w-100 h-100 d-flex justify-content-center align-items-center" style={{backgroundImage: `url('${data[key].img}')`}}>
                    <div className="topic-title">{data[key].name}</div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    );
}


export default Inspiration;
