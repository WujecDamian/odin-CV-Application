import { createElement, useState } from "react";
import React from "react";

export default function CVexperience({ editMode }) {
  const [modulesArray, setModulesArray] = useState([
    React.createElement(ExperienceModule),
  ]);

  function ExperienceModule() {
    const [company, setCompany] = useState("");
    const [positionTitle, setPositionTitle] = useState("");
    const [date, setDate] = useState("");

    //K.I.S.S. - Keep It Simple Stupid
    function handleChangeCompany(e) {
      setCompany(e.target.value);
    }
    function handleChangePositionTitle(e) {
      setPositionTitle(e.target.value);
    }
    function handleChangeDate(e) {
      setDate(e.target.value);
    }

    return (
      <section className="Experience_Module">
        <div className="input">
          <label htmlFor="company">company: </label>
          <input
            type="text"
            name="company"
            id="company"
            value={company}
            onChange={handleChangeCompany}
          />
        </div>
        <div className="input">
          <label htmlFor="positionTitle">positionTitle: </label>
          <input
            type="text"
            name="positionTitle"
            id="positionTitle"
            value={positionTitle}
            onChange={handleChangePositionTitle}
          />
        </div>
        <div className="input">
          <label htmlFor="date">date: </label>
          <input
            type="tel"
            name="date"
            id="date"
            value={date}
            onChange={handleChangeDate}
          />
        </div>
      </section>
    );
  }

  function addModule() {
    console.log(modulesArray.length);
    let newModulesArray = modulesArray.slice();
    const eduModule = React.createElement(ExperienceModule);
    newModulesArray.push(eduModule);
    setModulesArray(newModulesArray);
    RenderModules();
  }
  function RenderModules() {
    return createElement(
      "section",
      { className: "ExperienceModules" },
      ...modulesArray,
    );
  }

  if (editMode === true) {
    return (
      <h2>
        Experience <i>(edit mode)</i>
        <RenderModules />
        <button onClick={addModule}>+</button>
      </h2>
    );
  } else {
    return <h2>Experience</h2>;
  }
}
