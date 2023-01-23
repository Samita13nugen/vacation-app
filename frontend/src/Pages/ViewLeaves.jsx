import * as React from "react";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createInstance } from "../axios/Axios";
import moment from "moment/moment";
import Leaves from "../Component/Leaves";
import { ToastContainer } from "react-toastify";
import Notify from "../Component/Toaster";
import { useNavigate } from "react-router-dom";

export default function ViewLeaves() {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  async function filterHolidays(filteredDate) {
    const instance = createInstance(localStorage.getItem("token"));
    await instance({
      url: "/vacation",
      method: "POST",
      data: {
        vacation_name: "",
        start_date: filteredDate,
        end_date: "",
      },
    })
      .then((res) => {
        setData(res?.data);
        res?.data?.error && Notify(res?.data?.error);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function FetchHolidays() {
    const instance = createInstance(localStorage.getItem("token"));
    await instance({
      url: "/get_vacations",
      method: "POST",
      data: {
        vacation_name: "",
        start_date: "",
        end_date: "",
      },
    })
      .then((res) => {
        console.log(res);
        setData(res?.data?.data);
      })
      .catch((err) => {
        navigate("/signin");
        localStorage.removeItem("token");
        console.log(err, "****");
      });
  }

  useEffect(() => {
    FetchHolidays();
  }, []);

  useEffect(() => {
    console.log("udpated ", data);
  }, [data]);

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Grid container spacing={3}>
        <Grid style={{ margin: "2rem auto" }}>
          {data?.length && <Leaves data={data} />}
        </Grid>
        <div
          style={{
            height: "max-content",
            margin: " auto ",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Calendar
            onChange={(e) => {
              setDate(e);
              filterHolidays(moment(e).format("YYYY-MM-DD"));
            }}
            value={date}
          />
          <span
            style={{
              color: "black",
              fontSize: "bold",
              marginTop: "3rem",
              padding: "0.6rem 0.5rem",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 0px inset",
            }}
          >
            {date.toDateString()}
          </span>
        </div>
      </Grid>
      <ToastContainer />
    </Container>
  );
}
