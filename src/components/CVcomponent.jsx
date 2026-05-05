import CVheading from "./components/CVsubComponents/CVheading.jsx";
import CVgeneral from "./components/CVsubComponents/CVgeneral.jsx";
import CVeducation from "./components/CVsubComponents/CVeducation.jsx";
import CVexperience from "./components/CVsubComponents/CVexperience.jsx";

export default function CVcomponent() {
  return (
    <>
      <CVheading></CVheading>
      <CVgeneral></CVgeneral>
      <CVeducation></CVeducation>
      <CVexperience></CVexperience>
    </>
  );
}
