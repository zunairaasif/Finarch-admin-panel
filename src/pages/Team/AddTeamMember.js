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
import React, { useRef, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Formik, Form, Field, ErrorMessage } from "formik";

import style from "./style";
import Layout from "../../components/Layout";

const AddTeamMember = () => {
  const fileInputRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    job_post: Yup.string().required("Required!"),
    qualification: Yup.string().required("Required!"),
  });

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImage(files);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    const postData = {
      ...values,
      image: image[0],
    };

    axios
      .post(`${baseUrl}/team/addTeam`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setSubmitting(false);
        setSuccess(true);
        setImage(null);
        resetForm();
      })
      .catch((error) => {
        console.error("Uploading Error:", error);
        setSubmitting(false);
        setError(true);
        setImage(null);
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
            Error posting member! Try again!
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
          <Typography variant="body1">Member posted successfully!</Typography>
        </Alert>
      </Snackbar>

      <Grid container sx={style.wrapper}>
        <Grid item lg={9} md={9} sm={12} xs={12} container sx={style.container}>
          <Typography variant="h4">Add New Team Member</Typography>
          <Typography variant="body2" sx={style.space}>
            Please enter details of the Team Member below.
          </Typography>

          <Formik
            initialValues={{
              name: "",
              job_post: "",
              qualification: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form style={style.form}>
                <Grid container gap={1} sx={style.block}>
                  <Box sx={style.form}>
                    <Typography variant="body2">Name</Typography>
                    <Field
                      fullWidth
                      size="small"
                      name="name"
                      margin="dense"
                      as={TextField}
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="name"
                      style={style.error}
                    />
                  </Box>

                  <Box sx={style.form}>
                    <Typography variant="body2">Designation</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="job_post"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="job_post"
                      style={style.error}
                    />
                  </Box>

                  <Box sx={style.form}>
                    <Typography variant="body2">Qualification</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="qualification"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="qualification"
                      style={style.error}
                    />
                  </Box>

                  <Typography variant="body2">
                    Please attach the Porfolio Image of the Team Member.
                  </Typography>
                  {image && image.length > 0 ? (
                    <Grid
                      gap={2}
                      container
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        alt="Preview"
                        width={160}
                        height={160}
                        src={URL.createObjectURL(image[0])}
                      />
                      <Grid
                        item
                        lg={4}
                        md={4}
                        sm={5}
                        xs={8}
                        sx={style.upload}
                        onClick={handleUpload}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                        <CameraAltIcon sx={style.imgIcon} />
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      lg={5}
                      md={5}
                      sm={5}
                      xs={8}
                      sx={style.upload}
                      onClick={handleUpload}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <CameraAltIcon sx={style.imgIcon} />
                    </Grid>
                  )}

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

export default AddTeamMember;
