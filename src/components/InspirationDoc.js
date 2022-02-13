import {useParams} from "react-router-dom";
import NavBar from './NavBar'
import {Row, Col} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "quill/dist/quill.snow.css";
import "./css/BucketListDoc.css";
import {data} from "../data/data"

export default function InspirationDoc() {
    let { id } = useParams();
    return (
        <div className="container-fluid bucket-list-doc-container d-flex px-3">
            <NavBar />
            <div className="mt-5 pt-4 w-100 px-5">
                <Row xs={1} md={3} className="g-2">
                    {data[id].articles.map((article, idx) => (
                        <Col key={idx}>
                            <a href={article.url} target="_blank" rel="noreferrer" className="btn">
                                <div className="w-100 d-flex flex-column align-items-center">
                                    <img className="w-100 mb-3 rounded" src={article.img} alt=""></img>
                                    <h5 className="align-self-start text-capitalize text-start mb-2" style={{fontWeight: "700"}}>{article.title}</h5>
                                    <div className="text-start overflow-hidden w-100" style={{height: "50px", textOverflow: "ellipsis"}}>{article.intro}</div><span className="w-100 text-start">...</span>
                                    <div className="w-100 text-start" style={{fontWeight: "500"}}>By {article.author}</div>
                                </div>
                            </a>
                        </Col>
                    ))}
                </Row>
                {data[id].video.map((url, idx) => (
                    <div className="w-100 position-relative my-5" style={{paddingTop: "56.25%"}}>
                        <iframe className="w-100 h-100 position-absolute top-0" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                ))}
            </div>
            
        </div>
    )
}