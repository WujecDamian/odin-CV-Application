import CVcomponent from "./components/CVcomponent.jsx";

import "./App.css";
import "./styles/componentStyling.css";

function App() {
  return (
    <main className="app-shell">
      <section className="hero-panel">
        <span className="eyebrow">Resume Studio</span>
        <h1>Build clean, polished CVs with ease.</h1>
        <p>Add General Information, Your Education & Experience</p>
      </section>

      <section className="cv-frame">
        <CVcomponent />
      </section>
    </main>
  );
}

export default App;
