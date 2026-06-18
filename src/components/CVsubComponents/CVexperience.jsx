export default function CVexperience({
  editMode,
  item,
  onChange,
  onRemove,
  canRemove,
}) {
  function handleFieldChange(field, value) {
    onChange(item.id, field, value);
  }

  return (
    <section className="experience_Module entry-module">
      {editMode ? (
        <>
          <div className="entry-row">
            <div className="input">
              <label htmlFor={`company-${item.id}`}>Company</label>
              <input
                id={`company-${item.id}`}
                type="text"
                value={item.company}
                onChange={(event) =>
                  handleFieldChange("company", event.target.value)
                }
              />
            </div>
            <div className="input">
              <label htmlFor={`position-${item.id}`}>Position</label>
              <input
                id={`position-${item.id}`}
                type="text"
                value={item.position}
                onChange={(event) =>
                  handleFieldChange("position", event.target.value)
                }
              />
            </div>
          </div>
          <div className="entry-row">
            <div className="input">
              <label htmlFor={`location-${item.id}`}>Location</label>
              <input
                id={`location-${item.id}`}
                type="text"
                value={item.location}
                onChange={(event) =>
                  handleFieldChange("location", event.target.value)
                }
              />
            </div>
            <div className="input">
              <label htmlFor={`experience-dates-${item.id}`}>Dates</label>
              <input
                id={`experience-dates-${item.id}`}
                type="text"
                value={`${item.startDate} — ${item.endDate}`}
                placeholder="2022 - 2024"
                onChange={(event) => {
                  const [startDate, endDate] = event.target.value
                    .split("—")
                    .map((part) => part.trim());
                  handleFieldChange("startDate", startDate || "");
                  handleFieldChange("endDate", endDate || "");
                }}
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor={`experience-summary-${item.id}`}>Summary</label>
            <textarea
              id={`experience-summary-${item.id}`}
              rows="3"
              value={item.summary}
              onChange={(event) =>
                handleFieldChange("summary", event.target.value)
              }
            />
          </div>
          {canRemove && (
            <button
              className="Form__Btn secondary remove-entry"
              type="button"
              onClick={() => onRemove(item.id)}
            >
              Remove experience
            </button>
          )}
        </>
      ) : (
        <>
          <div className="entry-row preview-row">
            <div>
              <h3>{item.position || "Role"}</h3>
              <p>{item.company || "Company"}</p>
            </div>
            <span className="entry-date">
              {item.startDate || "Start"} — {item.endDate || "End"}
            </span>
          </div>
          {item.location && <p>{item.location}</p>}
          {item.summary && <p className="entry-summary">{item.summary}</p>}
        </>
      )}
    </section>
  );
}
