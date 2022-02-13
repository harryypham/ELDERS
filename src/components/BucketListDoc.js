import Quill from "quill";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { auth } from "../firebase";
import NavBar from './NavBar'
import {Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "quill/dist/quill.snow.css";
import "./css/BucketListDoc.css";
const gradient = ['purple-to-blue', 'cyan-to-blue','green-to-blue','purple-to-pink','pink-to-orange','teal-to-lime'];
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

export default function BucketListDoc() {
    let { id } = useParams();
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [data, setData] = useState()
    const [quill, setQuill] = useState();

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return
        wrapper.innerHTML = '';
        const editor = document.createElement("div");
        wrapper.append(editor);
        const q = new Quill(editor, {theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS }})
        setQuill(q);
    }, [])
    useEffect(() => {
        if (user) {
            onSnapshot(doc(db, "bucketlist", user.uid), (doc) => {
                const data = doc.data();
                setData(data)
            })
        } else {
            navigate("/login");
        }
        }, []);
    useEffect(() => {
        if (quill == null || data[id] == null) return
        quill.setContents(data[id].value)
    }, [quill, data, id])
    async function saveDoc() {
        if (quill == null || user == null || id == null) return
        if (!data.hasOwnProperty(id)) return
        const docRef = doc(db, "bucketlist", user.uid);
        const value = {}
        const field = `${id}.value`
        value[field] = Object.assign({}, quill.getContents());
        await updateDoc(docRef, value)
    }
    if (data) {
        return (
                <div className="container-fluid bucket-list-doc-container d-flex px-3">
                    <NavBar />
                    <div className="content-container w-100 mt-5 py-4 d-flex ">
                        <div className="doc-info">
                            <h2 className="text-gray-700">{data[id].name}</h2>
                            <img className="my-3" src={data[id].img} alt=""></img>
                            <button type="button" className="btn-save-doc tw-purple" onClick={saveDoc}>
                                <span>Save Document</span>
                            </button>
                            <div className="others-topic-container"> 
                                <h5 className="mt-3">Other topics:</h5>
                                <Row xs={1} md={2} className="g-2 mt-3">
                                    {Object.keys(data).map((key, idx) => (
                                        <Col>
                                        <Link to={`/bucket-list/${key}`} className={`btn-topic tw-${gradient[Math.floor(Math.random() * gradient.length)]}`}>
                                            <span>{data[key].name}</span>
                                        </Link>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>
                        <div className="doc-container" ref={wrapperRef}></div>
                    </div>
                </div>
        )
    } else {
        return <div>Hello</div>
    }
}