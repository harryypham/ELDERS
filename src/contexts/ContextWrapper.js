import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "init":
      console.log(payload)
      return payload;
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) =>
        evt.id === payload.id ? payload : evt
      );
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}


async function saveEventDoc(user, collection, data) {
  await setDoc(doc(db, collection, user.uid), data);
}
export default function ContextWrapper(props) {
  const user = auth.currentUser;
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false)
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    []
  );
  async function getEventDoc(user, collection) {
    const docRef = doc(db, collection, user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data()
      console.log(data);
      dispatchCalEvent({type: "init", payload: data.events})
      setLoading(true);
    } else {
      setLoading(true);
    } 
  }
  // function initEvents() {
  //   const storageEvents = localStorage.getItem("savedEvents");
  //   const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  //   return parsedEvents;
  // }
  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);
  useEffect(() => {
    getEventDoc(auth.currentUser, "calendar");
  }, [])
  useEffect(() => {
    if (!loading) return;
    console.log(savedEvents)
    // localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    saveEventDoc(user, "calendar", {
      events: savedEvents,
    })
  }, [savedEvents, user, loading]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
