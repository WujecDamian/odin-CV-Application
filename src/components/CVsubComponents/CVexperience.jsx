import { useState } from "react";

export default function CVexperience({ editMode }) {
  const [company, setCompany] = useState("");
  const [positionTitle, setPositionTitle] = useState("");
  const [date, setDate] = useState("");

  function handleChangeCompany(e) {
    setCompany(e.target.value);
  }
  function handleChangePositionTitle(e) {
    setPositionTitle(e.target.value);
  }
  function handleChangeDate(e) {
    setDate(e.target.value);
  }

  if (editMode === true) {
    return (
      <section className="experience_Module">
        <div className="input">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            id="company"
            value={company}
            onChange={handleChangeCompany}
          />
        </div>
        <div className="input">
          <label htmlFor="positionTitle">Position title</label>
          <input
            type="text"
            name="positionTitle"
            id="positionTitle"
            value={positionTitle}
            onChange={handleChangePositionTitle}
          />
        </div>
        <div className="input">
          <label htmlFor="experienceDate">Date</label>
          <input
            type="text"
            name="date"
            id="experienceDate"
            value={date}
            onChange={handleChangeDate}
          />
        </div>
      </section>
    );
  } else {
    return (
      <section className="experience_Module">
        <h3>Company: {company}</h3>
        <h3>Position title: {positionTitle}</h3>
        <h3>Date: {date}</h3>
      </section>
    );
  }
}
