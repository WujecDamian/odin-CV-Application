import CVheading from "./CVsubComponents/CVheading.jsx";
import CVgeneral from "./CVsubComponents/CVgeneral.jsx";
import CVeducation from "./CVsubComponents/CVeducation.jsx";
import CVexperience from "./CVsubComponents/CVexperience.jsx";
import { useState } from "react";

export default function CVcomponent() {
  const [editMode, setEditMode] = useState(true);

  function handleEditMode() {
    setEditMode(!editMode);
    console.log(editMode);
  }

  return (
    <>
      <CVheading editMode={editMode}></CVheading>
      <CVgeneral editMode={editMode}></CVgeneral>
      <CVeducation editMode={editMode}></CVeducation>
      <CVexperience editMode={editMode}></CVexperience>
      <button onClick={handleEditMode}>{editMode ? "Submit" : "Edit"}</button>
    </>
  );
}
