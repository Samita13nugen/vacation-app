import * as React from "react";
import AvatarProfile from "@mui/material/Avatar";
import Avatar from "@mui/icons-material/TimeToLeaveTwoTone";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select, MenuItem } from "@mui/material";

const theme = createTheme();

export default function FormPage({
  data,
  handleSubmit,
  onChange,
  role,
  buttonText,
  type,
}) {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}
        >
          {type === 3 ? (
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          ) : (
            <AvatarProfile
              sx={{ m: 1, bgcolor: "secondary.main" }}
            ></AvatarProfile>
          )}
          <Typography component="h1" variant="h5">
            {type === 3 ? "Apply Leaves" : buttonText}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {data}
            {type === 3 ? null : (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <Select
                  value={role || 2}
                  name="role"
                  onChange={(e) => onChange(e)}
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                    textAlign: "start",
                  }}
                >
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={2}>User</MenuItem>
                </Select>
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {buttonText}
            </Button>
            <Grid container justifyContent="flex-end" spacing={0.5}>
              <Grid item>
                {type === 1
                  ? "Already have an account? "
                  : type === 2
                  ? "Don't have a account? "
                  : null}
                </Grid>
                <Grid item>
                <Typography
                  variant="body1"
                  sx={{ color: "#3366CC", cursor: "default" }}
                  onClick={() =>
                    type === 1
                      ? navigate("/signin")
                      : type === 2
                      ? navigate("/signup")
                      : null
                  }
                >
                  {type === 1 ? "Sign In" : type === 2 ? "Sign Up" : null}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <ToastContainer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
