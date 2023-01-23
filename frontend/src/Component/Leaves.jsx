import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createInstance } from "../axios/Axios";
import "react-calendar/dist/Calendar.css";
import Button from "@mui/material/Button";
import moment from "moment/moment";
import TextField from "@mui/material/TextField/TextField";
import Paper from "@mui/material/Paper";

export default function ßßOrders({ data }) {
  const [requests, setRequests] = useState(data);
  const [filter, setFilter] = useState({
    vacationName: "",
    startDate: "",
    endDate: "",
  });

  const { vacationName, startDate, endDate } = filter;
  const onChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setRequests(data);
  }, [data]);

  async function filterHolidays() {
    const instance = createInstance(localStorage.getItem("token"));
    await instance({
      url: "/holidays",
      method: "POST",
      data: {
        vacation_name: vacationName,
        start_date: startDate,
        end_date: endDate,
      },
    })
      .then((res) => {
        setRequests(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        }}
      >
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
            id="outlined-basic"
            required
            label="search by name"
            variant="outlined"
            style={{ width: "30%", display: "flex" }}
            onChange={(e) => onChange(e)}
            name="vacationName"
            value={vacationName}
          />
          <TextField
            id="startdate"
            required
            label="Start-Date"
            type="date"
            value={startDate}
            onChange={(e) => onChange(e)}
            name="startDate"
            // sx={{  }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            required
            label="End-Date"
            value={endDate}
            onChange={(e) => onChange(e)}
            type="date"
            name="endDate"
            // sx={{ marginBottom:'5px'}}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => filterHolidays()}
          >
            Filter
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) =>
              setFilter({
                ...filter,
                vacationName: "",
                startDate: "",
                endDate: "",
              })
            }
          >
            Clear
          </Button>
        </div>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Sr.No.</TableCell>
              <TableCell>Vacation Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          {requests &&
            requests?.map((item, number) => (
              <TableBody key={`${item.id}-${number}`}>
                <TableRow key={item.id + number}>
                  {/* <TableCell>{item.id+1}</TableCell> */}
                  <TableCell>{number + 1}</TableCell>
                  <TableCell>{item.vacation_name}</TableCell>
                  <TableCell>
                    {moment(item.vacation_start_date).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>
                    {moment(item.vacation_end_date).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>
                    {moment(item.created_at).format("YYYY-MM-DD")}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
        </Table>
      </Paper>
    </React.Fragment>
  );
}
