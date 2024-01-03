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

import style from "../style";
import Layout from "../../../components/Layout";

const AddService = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const validationSchema = Yup.object().shape({
    service_name: Yup.string().required("Required!"),
    rate: Yup.string().required("Required!"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    axios
      .post(`${baseUrl}/service/postService`, values)
      .then((resp) => {
        if (resp.success) {
          setSubmitting(false);
          setSuccess(true);
          resetForm();
        }
        setSubmitting(false);
        setError(true);
        console.error("Posting Error:", resp.data.error.message);
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
            Error posting service! Try again!
          </Typography>
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => {
          setSuccess(false);
        }}
        TransitionProps={{ direction: "left" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert sx={style.field} severity={"success"}>
          <Typography variant="body1">Service posted successfully!</Typography>
        </Alert>
      </Snackbar>

      <Grid container sx={style.wrapper}>
        <Grid item lg={9} md={9} sm={12} xs={12} container sx={style.container}>
          <Typography variant="h4">Add New Service</Typography>
          <Typography variant="body2" sx={style.space}>
            Please enter the details of new Service and provide description.
          </Typography>

          <Formik
            initialValues={{
              service_name: "",
              rate: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form style={style.form}>
                <Grid container gap={1} sx={style.block}>
                  <Box sx={style.form}>
                    <Typography variant="body2">Service Name</Typography>
                    <Field
                      fullWidth
                      size="small"
                      name="service_name"
                      margin="dense"
                      as={TextField}
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="service_name"
                      style={style.error}
                    />
                  </Box>
                  <Box sx={style.form}>
                    <Typography variant="body2">Rate</Typography>
                    <Field
                      fullWidth
                      size="small"
                      name="rate"
                      margin="dense"
                      as={TextField}
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="rate"
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

export default AddService;
