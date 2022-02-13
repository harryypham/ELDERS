import dayjs from "dayjs";
import {auth} from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/CalendarHeader.css"
import React, { useContext, useState } from "react";
import {useAuth} from "../contexts/AuthContext"
import {Link, useNavigate } from "react-router-dom"
import {Button} from "react-bootstrap"
import GlobalContext from "../contexts/GlobalContext";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { logout } = useAuth();
  async function handleLogout() {
    setError("")
    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out");
      console.log(error);
    }
  }
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="px-4 py-2 d-flex align-items-center justify-content-start calendar-header">
      <h1>Calendar</h1>
      <button
        onClick={handleReset}
        className="border rounded py-2 px-4"
      >
        Today
      </button>
      <button onClick={handlePrevMonth} className="chevron-btn"><ChevronLeftIcon></ChevronLeftIcon></button>
      <button onClick={handleNextMonth} className="chevron-btn"><ChevronRightIcon></ChevronRightIcon></button>
      <h5 className="mx-4">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h5>
      <div className="position-absolute end-0 px-4">
        <Link className="text-dark text-decoration-none mx-3 fw-bold" to="/">Home</Link>
        {auth.currentUser && <Button variant="link" className="text-decoration-none text-dark align-baseline mx-3" onClick={handleLogout}>Log Out</Button>}
      </div>
    </header>
  );
}
