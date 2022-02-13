import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
export default function Sidebar() {
  return (
    <aside className="border tw-p-5 w-64" style={{backgroundColor: "#fcfcfc"}}>
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
