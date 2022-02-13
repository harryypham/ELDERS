import React, { useContext, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckIcon from '@mui/icons-material/Check';
const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className="h-screen vw-100 position-fixed start-0 top-0 d-flex justify-content-center align-items-center bg-fcfcfc transition-05">
      <form className="bg-white rounded-lg shadow-2xl w-25">
        <header className="bg-gray-100 px-4 py-2 d-flex justify-content-between align-items-center">
          <DragHandleIcon className="cursor-pointer"></DragHandleIcon>
          <div>
            {selectedEvent && (
              <DeleteIcon onClick={() => {
                dispatchCalEvent({
                  type: "delete",
                  payload: selectedEvent,
                });
                setShowEventModal(false);
              }} className="cursor-pointer mx-3"></DeleteIcon>
            )}
            <button className="border-0 bg-transparent" onClick={() => setShowEventModal(false)}>
              <ClearIcon></ClearIcon>
            </button>
          </div>
        </header>
        
        <div className="w-100">
          <div className="w-100 p-2 d-flex flex-column align-items-center">
            <h4 className="text-left w-90 pt-2 pb-4 color-blue">Add Event</h4>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="w-90 pb-1 border-0 border-bottom"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="w-90 d-flex mt-4">
              <CalendarTodayIcon></CalendarTodayIcon>
              <p className="w-fit-content ms-3">{daySelected.format("dddd, MMMM DD")}</p>
            </div>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="w-90 pb-1 my-4 border-0 border-bottom"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="d-flex w-90 justify-content-between">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <CheckIcon className="text-white text-sm"></CheckIcon>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="d-flex justify-content-center border-t w-100 my-4">
          <div className="w-90">
            <button
              type="submit"
              onClick={handleSubmit}
              className="blue-btn border rounded py-2 px-4"
            >
              Save
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
