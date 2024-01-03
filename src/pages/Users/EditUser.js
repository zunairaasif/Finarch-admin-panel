import {
  Box,
  Grid,
  Alert,
  Slide,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

import style from "./style";
import Layout from "../../components/Layout";

const EditUser = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialUserDetails = state?.row;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [error, setError] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required!").email(),
    password: Yup.string().required("Required!").min(6),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const postData = {
      ...values,
      id: initialUserDetails.id,
    };

    axios
      .post(`${baseUrl}/users/updateUser`, postData)
      .then((response) => {
        console.log("User Uploaded:", response.data);
        setSubmitting(false);
        navigate("/users");
      })
      .catch((error) => {
        console.error("Uploading Error:", error);
        setSubmitting(false);
        setError(true);
      });
  };

  return (
    <Layout>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => {
          setError(false);
        }}
        TransitionProps={{ direction: "left" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert sx={style.field} severity={"error"}>
          <Typography variant="body1">
            Error updating user! Try again!
          </Typography>
        </Alert>
      </Snackbar>

      <Grid container sx={style.wrapper}>
        <Grid item lg={9} md={9} sm={12} xs={12} container sx={style.container}>
          <Typography variant="h4">Update User</Typography>
          <Typography variant="body2" sx={style.space}>
            Please Enter the Updated Email and Password.
          </Typography>

          <Formik
            initialValues={{
              email: initialUserDetails?.email || "",
              password: initialUserDetails?.password || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form style={style.form}>
                <Grid container gap={1} sx={style.block}>
                  <Box sx={style.form}>
                    <Typography variant="body2">Email</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="email"
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
                    sx={style.btn}
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default EditUser;
