import CVheading from "./CVsubComponents/CVheading.jsx";
import CVgeneral from "./CVsubComponents/CVgeneral.jsx";
import CVeducation from "./CVsubComponents/CVeducation.jsx";
import CVexperience from "./CVsubComponents/CVexperience.jsx";
import { useState } from "react";

export default function CVcomponent() {
  const [editMode, setEditMode] = useState(true);

  //* EDUCATION MODULES
  const [educationModules, setEducationModules] = useState([
    <CVeducation editMode={editMode} key={crypto.randomUUID()}></CVeducation>,
  ]);
  function addEduModule() {
    const newEducationModules = [
      ...educationModules,
      <CVeducation editMode={editMode} key={crypto.randomUUID()}></CVeducation>,
    ];
    setEducationModules(newEducationModules);
  }

  function handleEditMode() {
    setEditMode(!editMode);
    console.log(editMode);
  }
  //* EXPERIENCE MODULES
  const [experienceModules, setExperienceModules] = useState([
    <CVexperience editMode={editMode} key={crypto.randomUUID()}></CVexperience>,
  ]);
  function addExpModule() {
    const newExperienceModules = [
      ...experienceModules,
      <CVexperience
        editMode={editMode}
        key={crypto.randomUUID()}
      ></CVexperience>,
    ];
    setExperienceModules(newExperienceModules);
  }

  return (
    <>
      <CVheading editMode={editMode}></CVheading>
      <CVgeneral editMode={editMode}></CVgeneral>
      <section className="CV_education">
        <h2>Education:</h2>
        <div className="education_modules">
          {educationModules.map(() => (
            <>
              <CVeducation editMode={editMode}></CVeducation>
            </>
          ))}
        </div>
        <button onClick={addEduModule}>+</button>
      </section>

      <section className="CV_experience">
        <h2>Experience:</h2>
        <div className="experience_modules">
          {experienceModules.map(() => (
            <>
              <CVexperience editMode={editMode}></CVexperience>
            </>
          ))}
        </div>
        <button onClick={addExpModule}>+</button>
      </section>

      <button onClick={handleEditMode}>{editMode ? "Submit" : "Edit"}</button>
    </>
  );
}
