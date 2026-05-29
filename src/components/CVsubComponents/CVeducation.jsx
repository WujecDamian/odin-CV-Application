import { useState } from "react";

export default function CVeducation({ editMode }) {
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
            onChange={(e) => handleChangeTitleOfStudy(e)}
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
