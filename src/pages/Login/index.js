import {
  Box,
  Grid,
  Slide,
  Alert,
  Button,
  Snackbar,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import style from "./style";
import logo from "../../images/logo-white.svg";
import { AuthContext, UserContext } from "../../context";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { setToken } = useContext(AuthContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Required!"),
    password: Yup.string().required("Required!").min(6),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    axios
      .post(`${baseUrl}/auth/login`, values)
      .then((response) => {
        if (response.data.success) {
          setToken(true);
          setSubmitting(false);
          setUser(response.data.data.email);
          navigate("/dashboard");
        } else {
          setOpenSnackbar(true);
          setSubmitting(false);
          console.error("Error:", response.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmitting(false);
      });
  };

  return (
    <Grid container style={style.container}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => setOpenSnackbar(false)}
        TransitionProps={{ direction: "left" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert sx={style.alert} severity="error">
          <Typography variant="subtitl1">Invalid email or password!</Typography>
        </Alert>
      </Snackbar>

      <Grid item lg={4} md={4} sm={4} xs={4} gap={3} sx={style.login}>
        <img src={logo} alt="finarch logo" width={300} />

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form style={style.form}>
              <Grid container gap={2} sx={style.login}>
                <Box sx={style.form}>
                  <Typography variant="body2">Email</Typography>
                  <Field
                    fullWidth
                    size="small"
                    name="email"
                    margin="dense"
                    as={TextField}
                    variant="outlined"
                    style={style.field}
                  />
                  <ErrorMessage
                    component="div"
                    name="email"
                    style={style.error}
                  />
                </Box>

                <Box sx={style.form}>
                  <Typography variant="body2">Password</Typography>
                  <Field
                    fullWidth
                    size="small"
                    margin="dense"
                    as={TextField}
                    name="password"
                    variant="outlined"
                    style={style.field}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    name="password"
                    style={style.error}
                  />
                </Box>

                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  sx={style.button}
                  variant="contained"
                  disabled={submitting}
                >
                  {submitting ? "Logging in..." : "Login"}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Login;
