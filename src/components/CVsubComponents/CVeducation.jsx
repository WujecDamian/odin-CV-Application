import { createElement, useState } from "react";
import React from "react";

export default function CVeducation({ editMode }) {
  const [modulesArray, setModulesArray] = useState([
    React.createElement(EducationModule),
  ]);

  function EducationModule() {
    const [school, setSchool] = useState("");
    const [titleOfStudy, setTitleOfStudy] = useState("");
    const [date, setDate] = useState("");

    //K.I.S.S. - Keep It Simple Stupid
    function handleChangeSchool(e) {
      setSchool(e.target.value);
    }
    function handleChangeTitleOfStudy(e) {
      setTitleOfStudy(e.target.value);
    }
    function handleChangeDate(e) {
      setDate(e.target.value);
    }
    if (editMode === true) {
      return (
        <section className="education_Module">
          <div className="input">
            <label htmlFor="school">school: </label>
            <input
              type="text"
              name="school"
              id="school"
              value={school}
              onChange={handleChangeSchool}
            />
          </div>
          <div className="input">
            <label htmlFor="titleOfStudy">titleOfStudy: </label>
            <input
              type="text"
              name="titleOfStudy"
              id="titleOfStudy"
              value={titleOfStudy}
              onChange={handleChangeTitleOfStudy}
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
    } else {
      return (
        <section className="education_Module">
          <h3>School: {school}</h3>
          <h3>Title of study: {titleOfStudy}</h3>
          <h3>Date: {date}</h3>
        </section>
      );
    }
  }

  function addModule() {
    console.log(modulesArray.length);
    let newModulesArray = modulesArray.slice();
    const eduModule = React.createElement(EducationModule);
    newModulesArray.push(eduModule);
    setModulesArray(newModulesArray);
    RenderModules();
  }
  function RenderModules() {
    return createElement(
      "section",
      { className: "educationModules" },
      ...modulesArray,
    );
  }

  return (
    <h2>
      Education <i>(edit mode)</i>
      <RenderModules />
      <button onClick={addModule}>+</button>
    </h2>
  );
}
