import React, { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="align-items-center tw-mt-3 d-block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              updateLabel({ label: lbl, checked: !checked })
            }
            className={`label-checkbox h-5 w-5 text-${lbl}-500 rounded border-1 focus:ring-0 cursor-pointer`}
          />
          <span className={`ms-2 text-capitalize text-${lbl}-500`}>{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
}
