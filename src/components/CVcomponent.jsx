import CVheading from "./CVsubComponents/CVheading.jsx";
import CVgeneral from "./CVsubComponents/CVgeneral.jsx";
import CVeducation from "./CVsubComponents/CVeducation.jsx";
import CVexperience from "./CVsubComponents/CVexperience.jsx";
import { useState } from "react";

export default function CVcomponent() {
  const [editMode, setEditMode] = useState(true);

  const [educationItems, setEducationItems] = useState([
    { id: crypto.randomUUID() },
  ]);
  const [experienceItems, setExperienceItems] = useState([
    { id: crypto.randomUUID() },
  ]);

  function addEduModule() {
    setEducationItems((prev) => [...prev, { id: crypto.randomUUID() }]);
  }

  function addExpModule() {
    setExperienceItems((prev) => [...prev, { id: crypto.randomUUID() }]);
  }

  function handleEditMode() {
    setEditMode((current) => !current);
  }

  return (
    <div className="resume-shell">
      <header className="section-header header-top">
        <CVheading editMode={editMode} />
        <button className="Form__Btn toggle" onClick={handleEditMode}>
          {editMode ? "Preview" : "Edit"}
        </button>
      </header>

      <CVgeneral editMode={editMode} />

      <section className="CV_education">
        <div className="section-header">
          <h2>Education</h2>
          <button
            className="add-btn"
            onClick={addEduModule}
            aria-label="Add education"
          >
            +
          </button>
        </div>
        <div className="education_modules">
          {educationItems.map((item) => (
            <CVeducation editMode={editMode} key={item.id} />
          ))}
        </div>
      </section>

      <section className="CV_experience">
        <div className="section-header">
          <h2>Experience</h2>
          <button
            className="add-btn"
            onClick={addExpModule}
            aria-label="Add experience"
          >
            +
          </button>
        </div>
        <div className="experience_modules">
          {experienceItems.map((item) => (
            <CVexperience editMode={editMode} key={item.id} />
          ))}
        </div>
      </section>

      <button
        className={editMode ? "Form__Btn primary" : "Form__Btn secondary"}
        onClick={handleEditMode}
      >
        {editMode ? "Submit" : "Edit CV"}
      </button>
    </div>
  );
}
