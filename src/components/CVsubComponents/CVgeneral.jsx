import { useState } from "react";

export default function CVgeneral({ editMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const setters = {
    name: setName,
    email: setEmail,
    phone: setPhone,
  };

  function handleChange(state, e) {
    setters[state]?.(e.target.value);
  }

  if (editMode === true) {
    return (
      <section className="CV_general">
        <h2>General</h2>
        <div className="input">
          <label htmlFor="Name">Name: </label>
          <input
            type="text"
            name="Name"
            id="name"
            value={name}
            onChange={(e) => handleChange("name", e)}
          />
        </div>
        <div className="input">
          <label htmlFor="Email">Email: </label>
          <input
            type="email"
            name="Email"
            id="name"
            value={email}
            onChange={(e) => handleChange("email", e)}
          />
        </div>
        <div className="input">
          <label htmlFor="Phone">Phone: </label>
          <input
            type="tel"
            name="Phone"
            id="name"
            value={phone}
            onChange={(e) => handleChange("phone", e)}
          />
        </div>
      </section>
    );
  } else {
    return (
      <section className="input_edits">
        <h2>General</h2>
        <h3>Name: {name}</h3>
        <h3>E-mail: {email}</h3>
        <h3>Phone: {phone}</h3>
      </section>
    );
  }
}
