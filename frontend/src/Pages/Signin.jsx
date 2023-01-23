import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { createInstance } from "../axios/Axios";
import Notify from "../Component/Toaster";
import FormPage from "../Component/FormPage";

export default function SignIn() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    role: 1,
  });

  const [error, setError] = useState(false);
  const { email, password, role } = login;

  const onChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  async function Login() {
    const instance = createInstance(localStorage.getItem("token"));
    await instance({
      url: "/signin",
      method: "POST",
      data: {
        email: email,
        password: password,
        role: role,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("role", role);
        if (res?.data?.message) {
          role === 1 ? navigate("/") : navigate("/applyleave");
          Notify(res?.data?.message);
        } else res?.data?.error && Notify(res?.data?.error);
      })
      .catch((err) => {
        Notify("Invalid Credentials");
        console.log(err);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.includes("@") || !email.includes(".com")) {
      Notify("Please Enter correct email");
    } else if (!email || !password) {
      Notify("Please enter the correct credentails");
      setError(true);
    } else {
      Login();
    }
  };

  const data = () => {
    return (
      <>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          value={email}
          onChange={(e) => onChange(e)}
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          error={email === "" && error}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          value={password}
          onChange={(e) => onChange(e)}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
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
        buttonText="Sign In"
        type={2}
      />
    </>
  );
}
