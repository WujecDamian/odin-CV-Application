import { useState } from "react";

export default function CVeducation({ editMode }) {
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
            id="name"
            value={titleOfStudy}
            onChange={handleChangeTitleOfStudy}
          />
        </div>
        <div className="input">
          <label htmlFor="date">date: </label>
          <input
            type="tel"
            name="date"
            id="name"
            value={date}
            onChange={handleChangeDate}
          />
        </div>
      </section>
    );
  }

  function addModule() {
    const educationSection = document.querySelector(".education");
    let module = { EducationModule };
    educationSection.append(module);
  }

  if (editMode === true) {
    return (
      <h2>
        Education <i>(edit mode)</i>
        <section className="education">
          <EducationModule></EducationModule>
        </section>
        <button onClick={addModule}></button>
      </h2>
    );
  } else {
    return <h2>Education</h2>;
  }
}
