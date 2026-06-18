export default function CVgeneral({
  editMode,
  general,
  onGeneralChange,
  onPhotoUpload,
  skills,
  skillInput,
  onSkillInputChange,
  onAddSkill,
  onRemoveSkill,
}) {
  function handleInputChange(field, value) {
    onGeneralChange(field, value);
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  }

  return (
    <section className="CV_general profile-section">
      <div className="section-header">
        <h2>General</h2>
      </div>

      {editMode ? (
        <div className="general_Module profile-form">
          <div className="profile-photo-upload">
            <label className="photo-label" htmlFor="photo-upload">
              Photo
            </label>
            <div className="photo-preview-box">
              {general.photoUrl ? (
                <img
                  className="profile-photo"
                  src={general.photoUrl}
                  alt="Profile"
                />
              ) : (
                <div className="photo-placeholder">Upload a photo</div>
              )}
            </div>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>

          <div className="input-grid">
            <div className="input">
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                type="text"
                value={general.firstName}
                onChange={(event) =>
                  handleInputChange("firstName", event.target.value)
                }
              />
            </div>
            <div className="input">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                type="text"
                value={general.lastName}
                onChange={(event) =>
                  handleInputChange("lastName", event.target.value)
                }
              />
            </div>
            <div className="input">
              <label htmlFor="title">Headline</label>
              <input
                id="title"
                type="text"
                value={general.title}
                onChange={(event) =>
                  handleInputChange("title", event.target.value)
                }
              />
            </div>
            <div className="input">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                value={general.location}
                onChange={(event) =>
                  handleInputChange("location", event.target.value)
                }
              />
            </div>
            <div className="input">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                value={general.website}
                onChange={(event) =>
                  handleInputChange("website", event.target.value)
                }
              />
            </div>
          </div>

          <div className="input-grid">
            <div className="input">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={general.email}
                onChange={(event) =>
                  handleInputChange("email", event.target.value)
                }
              />
            </div>
            <div className="input">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                value={general.phone}
                onChange={(event) =>
                  handleInputChange("phone", event.target.value)
                }
              />
            </div>
          </div>

          <div className="input">
            <label htmlFor="bio">About</label>
            <textarea
              id="bio"
              rows="4"
              value={general.bio}
              onChange={(event) => handleInputChange("bio", event.target.value)}
            />
          </div>

          <div className="skills-editor">
            <div className="skill-input-row">
              <div className="input">
                <label htmlFor="skillInput">Add skill</label>
                <input
                  id="skillInput"
                  type="text"
                  value={skillInput}
                  placeholder="e.g. JavaScript, React, UX"
                  onChange={(event) => onSkillInputChange(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      onAddSkill();
                    }
                  }}
                />
              </div>
              <button
                type="button"
                className="Form__Btn primary"
                onClick={onAddSkill}
              >
                Add
              </button>
            </div>
            <div className="skill-list">
              {skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  className="skill-chip"
                  onClick={() => onRemoveSkill(skill)}
                  aria-label={`Remove skill ${skill}`}
                >
                  {skill} ×
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="general_Module profile-preview">
          <div className="profile-header">
            {general.photoUrl && (
              <img
                className="profile-photo"
                src={general.photoUrl}
                alt="Profile"
              />
            )}
            <div>
              <h1>
                {general.firstName || "First name"}{" "}
                {general.lastName || "Last name"}
              </h1>
              <p className="profile-title">
                {general.title || "Professional profile"}
              </p>
              <p className="profile-meta">
                {general.location && <span>{general.location}</span>}
                {general.website && (
                  <span>
                    • <a href={general.website}>{general.website}</a>
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="contact-grid">
            {general.email && <span>Email: {general.email}</span>}
            {general.phone && <span>Phone: {general.phone}</span>}
          </div>

          {general.bio && <p className="profile-bio">{general.bio}</p>}

          {skills.length > 0 && (
            <div className="skill-list preview-skills">
              {skills.map((skill) => (
                <span key={skill} className="skill-chip preview">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
