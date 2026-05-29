export default function CVheading({ editMode }) {
  return (
    <>
      {editMode ? (
        <h1 className="CV_heading">
          CV Creator <i className="edit">(edit mode)</i>
        </h1>
      ) : (
        <h1 className="CV_heading">CV Creator</h1>
      )}
    </>
  );
}
