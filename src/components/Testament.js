import Quill from "quill";
import {useNavigate} from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { doc, onSnapshot, updateDoc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { auth } from "../firebase";
import NavBar from './NavBar'
import "bootstrap/dist/css/bootstrap.min.css";
import "quill/dist/quill.snow.css";
import "./css/Testament.css"


export default function BucketListDoc() {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [data, setData] = useState()
    const [quill, setQuill] = useState();
    async function checkData() {
        const docSnap = await getDoc(doc(db, "testament", user.uid));
        if (docSnap.exists()) {
        } else {
            await setDoc(doc(db, "testament", user.uid), {
                value: ""
            })
        }
    }
    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return
        wrapper.innerHTML = '';
        const editor = document.createElement("div");
        wrapper.append(editor);
        const q = new Quill(editor, {theme: "snow", })
        setQuill(q);
    }, [])
    useEffect(() => {
        if (user) {
            checkData();
            onSnapshot(doc(db, "testament", user.uid), (doc) => {
                const data = doc.data();
                setData(data)
            })
        } else {
            navigate("/login");
        }
        }, [user, navigate]);
    useEffect(() => {
        if (quill == null || data == null) return
        quill.setContents(data.value)
    }, [quill, data])
    async function saveDoc() {
        if (quill == null || user == null) return
        const docRef = doc(db, "testament", user.uid);
        const value = {}
        const field = `value`
        value[field] = Object.assign({}, quill.getContents());
        await updateDoc(docRef, value)
    }
    if (data) {
        return (
                <div className="container-fluid testament-container d-flex px-3">
                    <NavBar />
                    <div className="content-container w-100 mt-5 py-4 d-flex flex-column align-items-center position-relative">
                        <h1>Testament</h1>
                        <p className="w-75 mb-4">Write down your thoughts, your hopes, and your aspirations to you, your family, and your friends here! It will be delivered to them once you permit us to do so! It’s just a step to assist you in sharing your last words with your beloved people! </p>
                        <div className="w-50" style={{height: "fit-content"}} ref={wrapperRef}></div>
                        <button type="button" className="btn-save-doc" onClick={saveDoc} style={{}}>Save</button>
                    </div>
                </div>
        )
    } else {
        return (
            <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center simple-loader" style={{backgroundImage: "url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/f5f47c62286713.5a8b970a1f535.gif')"}}>
                <h2 className="title text-uppercase" data-text="Loading...">Loading...</h2>
            </div>
        )
    }
}