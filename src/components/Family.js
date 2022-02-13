import "bootstrap/dist/css/bootstrap.min.css"
import {Row, Col, Card, Modal, Button, Form, Alert} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore"; 
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import { auth, db, storage } from "../firebase";
import './css/Family.css';
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import NavBar from "./NavBar"
import { testFamily } from "../data/data"




defineLordIconElement(loadAnimation);
function Family() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [family, setFamily] = useState(testFamily)
  const [modalShow, setModalShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const _ = useRef(null);
  const gradient = ['blue', 'orange','purple','pink','red','green'];
  const delay = ms => new Promise(res => setTimeout(res, ms));
  async function checkData(id) {
    const docRef = doc(db, "family", id);
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
        const check = checkData(user.uid);
        if (check) {
          onSnapshot(doc(db, "family", user.uid), async (doc) => {
            const data = doc.data();
            console.log(data);
            if (data) {
              setFamily(data);
              await delay(2000);
              setDisplay(true);
            } else {
              await delay(2000);
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
      <div className="vw-100 container-fluid mt-5 mb-3 pt-4 px-5 position-relative" ref={_}>
        <NavBar />
        <h1 className="text-center people-title linear-wipe ">Family</h1>
        <img src="/girl-wave.gif" alt="" className="position-absolute girl-wave" width="210" height="225"></img>
        <p className="text-center mb-5 position-relative" style={{zIndex: "2"}}>Insert every family member here with his/her personal information! Remember to attach a picture to remind you of the best moment with them!</p>
        <Row xs={1} md={4} className="g-2">
          {Object.keys(family).map((key, idx) => (
            <Col key={key}>
              <Link to={`/family/${key}`} className="btn">
                <Card className="card-people">
                  <Card.Img variant="top" src={family[key].img} className="card-image"/>
                  <Card.Body className={`${gradient[Math.floor(Math.random() * gradient.length)]}`}>
                    <Card.Title className={`text-center`}>{family[key].name}</Card.Title>
                      <ul className="fw-normal">
                        <li className="text-left">Relationship: {family[key].relationship}</li>
                        <li className="text-left">DOB: {family[key].dob}</li>
                        <li className="text-left">Number: {family[key].phone}</li>
                        <li className="text-left">Address: {family[key].address}</li>
                      </ul>
                    <hr></hr>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
          <Col className="col-add">
            <Button className="h-100 btn-add" variant="none" onClick={() => setModalShow(true)}>
              <Card className="card-add card-people">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <Card.Title>Add family member</Card.Title>
                  <Card.Img variant="top" src="/add-icon.gif" className="card-image w-75"></Card.Img>
                </Card.Body>
              </Card>
            </Button>
          </Col>
        </Row>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    );
  } else {
    return (
      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center loader">
        <h2 className="title" data-text="Loading...">Loading...</h2>
        <img src="/yess.gif" alt=""></img>
      </div>
    )
  }
  
}
function MyVerticallyCenteredModal(props) {
  const user = auth.currentUser;
  const nameRef = useRef();
  const relaRef = useRef();
  const dobRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const [img, setImg] = useState(null);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState("Submit")
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
      setLoadingBtn("Loading...")
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
          relationship: relaRef.current.value,
          dob: dobRef.current.value, 
          phone: phoneRef.current.value,
          address: addressRef.current.value,
          img: url
        }
        await setDoc(doc(db, "family", user.uid), data, {merge: true})
        setLoadingBtn("Submit");
        props.onHide();
      })
      
    } catch {
      setError("Failed to add member")
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
          Add Family Member
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
            <Form.Label>Relationship</Form.Label>
            <Form.Control placeholder="" ref={relaRef}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>DOB</Form.Label>
            <Form.Control placeholder="" ref={dobRef}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control placeholder="" ref={phoneRef}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="" ref={addressRef}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <label for="file">Select Image:</label>
            <input type="file" className="btn ml-2" onChange={handleImgChange} title=" "></input>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button disabled={loading} variant="primary" type="submit" onClick={handleSubmit}>
            {loadingBtn}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Family;
