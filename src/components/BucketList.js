import "bootstrap/dist/css/bootstrap.min.css"
import {Row, Col, Modal, Button, Form, Alert} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore"; 
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import { auth, db, storage } from "../firebase";
import './css/Family.css';
import './css/BucketList.css'
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import NavBar from "./NavBar"

defineLordIconElement(loadAnimation);
async function createBucketListDefault() {
  const user = auth.currentUser;
  const docRef = doc(db, "bucketlist", user.uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
      const data = {
          1: {
              name: "Food",
              img: "https://cdn.shopify.com/s/files/1/0529/2461/2804/articles/cheesy-nacho-new-3_1500x.jpg?v=1639402520",
              value: ""
          }, 
          2: {
              name: "Travel",
              img: "https://earrialk.sirv.com/travel.jpeg",
              value: ""
          },
          3: {
              name: "Daily Routine",
              img: "https://earrialk.sirv.com/Finger%20Flop%20%5Bprocess%5D.gif",
              value: ""
          },
          4: {
              name: "Music",
              img: "https://earrialk.sirv.com/ezgif.com-gif-maker%20(1).gif",
              value: ""
          }
      };
    await setDoc(doc(db, "bucketlist", user.uid), data)
  }
}





function BucketList() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [family, setFamily] = useState({
    anonymous : {
      name: "Example",
      relationship: "Octupus",
      dob: "01/01/2022",
      address: "123 Ocean",
      phone: "0123456789",
      img: "/family.gif"
    }
  })
  const [modalShow, setModalShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const _ = useRef(null);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  async function checkData(id) {
    const docRef = doc(db, "bucketlist", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(
    () => {
      if (user) {
        createBucketListDefault();
        const check = checkData(user.uid);
        if (check) {
          onSnapshot(doc(db, "bucketlist", user.uid), async (doc) => {
            const data = doc.data();
            console.log(data);
            if (data) {
              setFamily(data);
              await delay(1500);
              setDisplay(true);
            } else {
              await delay(1500);
              setDisplay(true);
            }
          })
        }
      } else {
        console.log("User not found !")
        navigate("/login");
      }
    },
    []
  );

  if (display) {
    return (
      <div className="vw-100 container-fluid mt-5 mb-3 pt-4 position-relative bucketlist-bg-container" ref={_}>
        <NavBar />
        <div className="marquee mb-1">
            <div>
                <span className="outer">
                    <span>Bucket</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>Bucket</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>Bucket</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>Bucket</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>Bucket</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>Bucket</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>Bucket</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>Bucket</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>Bucket</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>Bucket</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>Bucket</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>Bucket</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
            </div>
        </div>
        <Row xs={1} md={3} className="g-2">
          {Object.keys(family).map((key, idx) => (
            <Col>
              <Link to={`/bucket-list/${key}`} className="btn">
                <div className="topic-container" >
                  <div className="topic-content w-100 h-100 d-flex justify-content-center align-items-center" style={{backgroundImage: `url('${family[key].img}')`}}>
                    <div className="topic-title">{family[key].name}</div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
          <Col>
            <Button className="h-100 w-100 btn p-0" variant="none" onClick={() => setModalShow(true)}>
              <div className="topic-container" >
                  <div className="topic-content w-100 h-100 d-flex justify-content-center align-items-center" style={{background: "#000", boxShadow: "none"}}>
                    <div className="topic-title">Add</div>
                  </div>
              </div>
            </Button>
          </Col>
        </Row>
        <div className="marquee-left mb-1">
            <div>
                <span className="outer">
                    <span>List</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>List</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>List</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>List</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>List</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>List</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>List</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>List</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>List</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>List</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>List</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
                <span className="outer">
                    <span>List</span>
                    <img src="https://earrialk.sirv.com/Magic%20of%20Walk%20Cycles%20with%20Markus%20Magnusson.gif" alt=""></img>
                </span>
            </div>
        </div>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    );
  } else {
    return (
      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center simple-loader" style={{backgroundImage: "url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/f5f47c62286713.5a8b970a1f535.gif')"}}>
        <h2 className="title text-uppercase" data-text="Loading...">Loading...</h2>
        
      </div>
    )
  }
}
function MyVerticallyCenteredModal(props) {
  const user = auth.currentUser;
  const nameRef = useRef();
  const [img, setImg] = useState(null);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  function handleImgChange(e) {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      if (!img) return;
      const storageRef = ref(storage, `/images/${img.name}`)
      const uploadTask = uploadBytesResumable(storageRef, img)
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }, 
      (err) => console.log(err),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        let id = Math.random().toString(16).slice(2)
        let data = {};
        data[id] = {
          name: nameRef.current.value, 
          value: "",
          img: url
        }
        await setDoc(doc(db, "bucketlist", user.uid), data, {merge: true})
        props.onHide();
      })
    } catch {
      setError("Failed to add topic")
    }

    setLoading(false)
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Topic
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="" ref={nameRef}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <label for="file">Select Image:</label>
            <input type="file" className="btn ml-2" onChange={handleImgChange} title=" "></input>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button disabled={loading} variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}


export default BucketList;
