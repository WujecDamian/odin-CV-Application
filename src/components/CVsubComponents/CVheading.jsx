export default function CVheading(editMode) {
  return (
    <h1>{editMode == true ? <>CV Creator (edit mode)</> : "CV Creator"}</h1>
  );
}
