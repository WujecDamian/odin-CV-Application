import { useEffect, useState } from "react";
import html2canvas from "html2canvas/dist/html2canvas.esm.js";
import { jsPDF } from "jspdf";
import CVheading from "./CVsubComponents/CVheading.jsx";
import CVgeneral from "./CVsubComponents/CVgeneral.jsx";
import CVeducation from "./CVsubComponents/CVeducation.jsx";
import CVexperience from "./CVsubComponents/CVexperience.jsx";

const emptyEducation = () => ({
  id: crypto.randomUUID(),
  school: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  summary: "",
});

const emptyExperience = () => ({
  id: crypto.randomUUID(),
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  summary: "",
});

export default function CVcomponent() {
  const [editMode, setEditMode] = useState(true);
  const [skillInput, setSkillInput] = useState("");
  const [general, setGeneral] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    bio: "",
    photoUrl: "",
    photoFile: null,
  });
  const [skills, setSkills] = useState(["Creative writing", "Communication"]);
  const [educationItems, setEducationItems] = useState([emptyEducation()]);
  const [experienceItems, setExperienceItems] = useState([emptyExperience()]);

  useEffect(() => {
    return () => {
      if (general.photoUrl) {
        URL.revokeObjectURL(general.photoUrl);
      }
    };
  }, [general.photoUrl]);

  function handleToggleMode() {
    setEditMode((current) => !current);
  }

  function updateGeneral(key, value) {
    setGeneral((current) => ({ ...current, [key]: value }));
  }

  function handlePhotoChange(file) {
    if (!file) return;
    if (general.photoUrl) {
      URL.revokeObjectURL(general.photoUrl);
    }
    updateGeneral("photoUrl", URL.createObjectURL(file));
    updateGeneral("photoFile", file);
  }

  function addSkill() {
    const value = skillInput.trim();
    if (!value || skills.includes(value)) return;
    setSkills((current) => [...current, value]);
    setSkillInput("");
  }

  function removeSkill(skill) {
    setSkills((current) => current.filter((item) => item !== skill));
  }

  function updateEducation(id, field, value) {
    setEducationItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }

  function removeEducation(id) {
    setEducationItems((current) =>
      current.length === 1 ? current : current.filter((item) => item.id !== id),
    );
  }

  function addEducation() {
    setEducationItems((current) => [...current, emptyEducation()]);
  }

  function updateExperience(id, field, value) {
    setExperienceItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }

  function removeExperience(id) {
    setExperienceItems((current) =>
      current.length === 1 ? current : current.filter((item) => item.id !== id),
    );
  }

  function addExperience() {
    setExperienceItems((current) => [...current, emptyExperience()]);
  }

  async function downloadPDF() {
    const cvElement = document.querySelector(".cv-preview-root");
    if (!cvElement) return;

    const canvas = await html2canvas(cvElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${general.firstName || "My"}-CV.pdf`);
  }

  return (
    <div className="resume-shell">
      <header className="section-header header-top">
        <CVheading editMode={editMode} />
        <div className="button-group">
          <button className="Form__Btn toggle" onClick={handleToggleMode}>
            {editMode ? "Preview" : "Edit"}
          </button>
          {!editMode && (
            <button className="Form__Btn primary" onClick={downloadPDF}>
              Download PDF
            </button>
          )}
        </div>
      </header>

      <div className="cv-preview-root">
        <CVgeneral
          editMode={editMode}
          general={general}
          onGeneralChange={updateGeneral}
          onPhotoUpload={handlePhotoChange}
          skills={skills}
          skillInput={skillInput}
          onSkillInputChange={setSkillInput}
          onAddSkill={addSkill}
          onRemoveSkill={removeSkill}
        />

        <section className="CV_education">
          <div className="section-header">
            <h2>Education</h2>
            {editMode && (
              <button
                className="add-btn"
                onClick={addEducation}
                aria-label="Add education"
              >
                +
              </button>
            )}
          </div>
          <div className="education_modules">
            {educationItems.map((item) => (
              <CVeducation
                key={item.id}
                editMode={editMode}
                item={item}
                onChange={updateEducation}
                onRemove={removeEducation}
                canRemove={educationItems.length > 1}
              />
            ))}
          </div>
        </section>

        <section className="CV_experience">
          <div className="section-header">
            <h2>Experience</h2>
            {editMode && (
              <button
                className="add-btn"
                onClick={addExperience}
                aria-label="Add experience"
              >
                +
              </button>
            )}
          </div>
          <div className="experience_modules">
            {experienceItems.map((item) => (
              <CVexperience
                key={item.id}
                editMode={editMode}
                item={item}
                onChange={updateExperience}
                onRemove={removeExperience}
                canRemove={experienceItems.length > 1}
              />
            ))}
          </div>
        </section>
      </div>

      <button
        className={editMode ? "Form__Btn primary" : "Form__Btn secondary"}
        onClick={handleToggleMode}
      >
        {editMode ? "Finish and Preview" : "Edit CV"}
      </button>
    </div>
  );
}
