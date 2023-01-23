import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { createInstance } from "../axios/Axios";
import Notify from "../Component/Toaster";
import FormPage from "../Component/FormPage";

export default function SignUp() {
  const [input, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    role: 1,
  });
  
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, role } = input;

  async function AddUser() {
    const instance = createInstance(localStorage.getItem("token"));
    await instance({
      url: "/signup",
      method: "POST",
      data: {
        name: name,
        password: password,
        email: email,
        role: role,
      },
    })
      .then((res) => {
        res?.data?.message && navigate("/signin");
        res?.data?.error && Notify(res?.data?.error);
      })
      .catch((err) => {
        Notify(err.message);
        console.log(err);
      });
  }


  const onChange = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      Notify("Please Enter required fields");
      setError(true);
      return;
    }
    if (!email.includes("@") || !email.includes(".com")) {
      Notify("Please Enter correct email");
      return;
    }
    AddUser();
  };

  const data = () => {
    return (
      <>
        <TextField
          margin="normal"
          autoComplete="given-name"
          name="name"
          required
          fullWidth
          value={name}
          onChange={(e) => onChange(e)}
          id="name"
          label="Name"
          autoFocus
          error={name === "" && error}
        />
        <TextField
          margin="normal"
          type="email"
          required
          fullWidth
          id="email"
          value={email}
          onChange={(e) => onChange(e)}
          label="Email Address"
          name="email"
          autoComplete="email"
          error={email === "" && error}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          value={password}
          onChange={(e) => onChange(e)}
          type="password"
          id="password"
          autoComplete="new-password"
          error={password === "" && error}
        />
      </>
    );
  };

  return (
    <>
      <FormPage
        data={data()}
        handleSubmit={handleSubmit}
        onChange={onChange}
        role={role}
        buttonText="Sign Up"
        type={1}
      />
    </>
  );
}
