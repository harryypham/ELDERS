import React from "react";
import Day from "./Day";
import "./css/Tailwind.css"
export default function Month({ month }) {
  return (
    <div className="flex-1 d-grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
