import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "../util";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "../contexts/GlobalContext";
import EventModal from "./EventModal";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom"
function Calendar() {
  const user = auth.currentUser;
  const navigate = useNavigate()
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  useEffect(() => {
    if (user == null) {
      navigate("/login")
    }
  }, [user, navigate])
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen d-flex flex-column">
        <CalendarHeader />
        <div className="d-flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Calendar;