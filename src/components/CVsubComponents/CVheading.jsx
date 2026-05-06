export default function CVheading({ editMode }) {
  return (
    <>
      {editMode ? (
        <h1>
          CV Creator <i>(edit mode)</i>
        </h1>
      ) : (
        <h1>CV Creator</h1>
      )}
    </>
  );
}
