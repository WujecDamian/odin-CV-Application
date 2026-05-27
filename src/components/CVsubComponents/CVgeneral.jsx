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
        <div className="general_Module">
          <div className="input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="Name"
              id="name"
              autoComplete="name"
              value={name}
              onChange={(e) => handleChange("name", e)}
            />
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="Email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => handleChange("email", e)}
            />
          </div>
          <div className="input">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="Phone"
              id="phone"
              autoComplete="tel"
              value={phone}
              onChange={(e) => handleChange("phone", e)}
            />
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="CV_general">
        <div className="general_Module">
          <h2>General</h2>
          <h3>Name: {name}</h3>
          <h3>E-mail: {email}</h3>
          <h3>Phone: {phone}</h3>
        </div>
      </section>
    );
  }
}
