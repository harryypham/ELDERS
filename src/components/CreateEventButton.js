import React, { useContext } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../contexts/GlobalContext";
import './css/CreateEventButton.css'
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="create-event-btn rounded border-1 tw-p-2 d-flex align-items-center shadow-md hover:shadow-2xl "
    >
      <img src={plusImg} alt="create_event" className="w-7 h-7" />
      <span className="px-3"> Create</span>
    </button>
  );
}
