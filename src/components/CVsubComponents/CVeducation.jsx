export default function CVeducation({
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
    <section className="education_Module entry-module">
      {editMode ? (
        <>
          <div className="entry-row">
            <div className="input">
              <label htmlFor={`school-${item.id}`}>School</label>
              <input
                id={`school-${item.id}`}
                type="text"
                value={item.school}
                onChange={(event) =>
                  handleFieldChange("school", event.target.value)
                }
              />
            </div>
            <div className="input">
              <label htmlFor={`degree-${item.id}`}>Degree</label>
              <input
                id={`degree-${item.id}`}
                type="text"
                value={item.degree}
                onChange={(event) =>
                  handleFieldChange("degree", event.target.value)
                }
              />
            </div>
          </div>
          <div className="entry-row">
            <div className="input">
              <label htmlFor={`field-${item.id}`}>Field of study</label>
              <input
                id={`field-${item.id}`}
                type="text"
                value={item.field}
                onChange={(event) =>
                  handleFieldChange("field", event.target.value)
                }
              />
            </div>
            <div className="input">
              <label htmlFor={`dates-${item.id}`}>Dates</label>
              <input
                id={`dates-${item.id}`}
                type="text"
                value={`${item.startDate} — ${item.endDate}`}
                placeholder="2020 - 2024"
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
            <label htmlFor={`summary-${item.id}`}>Notes</label>
            <textarea
              id={`summary-${item.id}`}
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
              Remove education
            </button>
          )}
        </>
      ) : (
        <>
          <div className="entry-row preview-row">
            <div>
              <h3>{item.school || "School name"}</h3>
              <p>{item.degree || "Degree"}</p>
            </div>
            <span className="entry-date">
              {item.startDate || "Start"} — {item.endDate || "End"}
            </span>
          </div>
          {item.field && <p>{item.field}</p>}
          {item.summary && <p className="entry-summary">{item.summary}</p>}
        </>
      )}
    </section>
  );
}
