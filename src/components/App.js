import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "../contexts/AuthContext"
import ContextWrapper from "../contexts/ContextWrapper";
import Family from "./Family"
import Login from "./Login"
import Person from "./Person"
import Landing from "./Landing"
import Signup from "./Signup"
import Friend from "./Friend"
import BucketList from "./BucketList"
import BucketListDoc from "./BucketListDoc"
import Calendar from "./Calendar"
import Inspiration from "./Inspiration";
import InspirationDoc from "./InspirationDoc";
import Article from "./Article"
import ForgotPassword from "./ForgotPassword";
import Testament from "./Testament";
function App() {
    return (
        <div className="w-100">
        <BrowserRouter>
          <AuthProvider>
            <ContextWrapper>
              <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/family" element={<Family />}></Route>
                <Route path="/family/:id" element={<Person />}></Route>
                <Route path="/friends" element={<Friend />}></Route>
                <Route path="/friends/:id" element={<Person />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/bucket-list" element={<BucketList />}></Route>
                <Route path="/bucket-list/:id" element={<BucketListDoc />}></Route>
                <Route path="/inspiration" element={<Inspiration />}></Route>
                <Route path="/inspiration/:id" element={<InspirationDoc />}></Route>
                <Route path="/inspiration/:topicId/:articleId" element={<Article />}></Route>
                <Route path="/diary" element={<Calendar />}></Route>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/testament" element={<Testament />}></Route>
              </Routes>
            </ContextWrapper>
          </AuthProvider>
        </BrowserRouter>
        </div>
    )
}
export default App;