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

import style from "../style";
import Layout from "../../../components/Layout";

const EditService = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialServiceDetails = state?.row;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [error, setError] = useState(false);

  const validationSchema = Yup.object().shape({
    service_name: Yup.string().required("Required!"),
    rate: Yup.string().required("Required!"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const postData = {
      ...values,
      id: initialServiceDetails.id,
    };

    axios
      .post(`${baseUrl}/service/updateServices`, postData)
      .then(() => {
        setSubmitting(false);
        navigate("/services");
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

      <Grid container sx={style.wrapper}>
        <Grid item lg={9} md={9} sm={12} xs={12} container sx={style.container}>
          <Typography variant="h4">Update Service</Typography>
          <Typography variant="body2" sx={style.space}>
            Please update the details of Service.
          </Typography>

          <Formik
            initialValues={{
              service_name: initialServiceDetails?.service_name || "",
              rate: initialServiceDetails?.rate || "",
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
                      margin="dense"
                      as={TextField}
                      name="rate"
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

export default EditService;
