import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { createInstance } from "../axios/Axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import FormPage from "./FormPage";

export default function ApplyLeave() {
  const [data, setData] = useState({
    EmployeeName: "",
    VacationName: "",
    reason: "",
    startdate: "",
    enddate: "",
  });
  const [error, setError] = useState(false);

  const { EmployeeName, VacationName, startdate, enddate } = data;

  const navigate = useNavigate();

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const notify = (msg) => {
    toast(msg);
  };

  async function AddVacation() {
    const instance = createInstance(localStorage.getItem("token"));
    await instance({
      url: "/add_vacation",
      method: "POST",
      data: {
        vacation_name: VacationName,
        start_date: startdate,
        end_date: enddate,
      },
    })
      .then((res) => {
        notify(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!VacationName || !startdate || !enddate) {
      notify("Please enter required fields");
      setError(true);
    } else {
      AddVacation();
    }
  };

  const fields = () => {
    return (
      <>
        <TextField
          margin="normal"
          required
          fullWidth
          id="EmpName"
          value={EmployeeName}
          onChange={(e) => onChange(e)}
          label="Employe Name"
          name="EmployeeName"
          autoFocus
          error={EmployeeName === "" && error}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="VacationName"
          value={VacationName}
          onChange={(e) => onChange(e)}
          label="Vacation Name"
          type="VacationName"
          id="VacationName"
          error={VacationName === "" && error}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.4rem",
            minHeight: "7rem",
          }}
        >
          <TextField
            id="startdate"
            label="Start-Date"
            type="date"
            value={startdate}
            onChange={(e) => onChange(e)}
            name="startdate"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: moment(new Date()).format("YYYY-MM-DD"),
            }}
            error={startdate === "" && error}
          />
          <TextField
            id="date"
            label="End-Date"
            value={enddate}
            onChange={(e) => onChange(e)}
            type="date"
            name="enddate"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: moment(new Date()).format("YYYY-MM-DD"),
            }}
            error={enddate === "" && error}
          />
        </div>
      </>
    );
  };

  useEffect(() => {
    return !localStorage.getItem("token") ? navigate("/signin") : null;
  }, []);

  return (
    <>
      <FormPage
        data={fields()}
        handleSubmit={handleSubmit}
        onChange={onChange}
        buttonText="Submit"
        type={3}
      />
    </>
  );
}
