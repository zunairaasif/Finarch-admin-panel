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

import style from "./styles";
import Layout from "../../components/Layout";

const AddProject = () => {
  const fileInputRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    location: Yup.string().required("Required!"),
    year: Yup.string().required("Required!"),
    client: Yup.string().required("Required!"),
    type: Yup.string().required("Required!"),
    category: Yup.string().required("Required!"),
    size: Yup.string().required("Required!"),
    status: Yup.string().required("Required!"),
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
      project_images: image[0],
    };

    axios
      .post(`${baseUrl}/projects/postProject`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Image Uploaded:", response.data);
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
            Error posting image! Try again!
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
          <Typography variant="body1">Image posted successfully!</Typography>
        </Alert>
      </Snackbar>

      <Grid container sx={style.wrapper}>
        <Grid item lg={9} md={9} sm={12} xs={12} container sx={style.container}>
          <Typography variant="h4">Add New Project</Typography>
          <Typography variant="body2" sx={style.space}>
            Please enter details of the Project below.
          </Typography>

          <Formik
            initialValues={{
              name: "",
              location: "",
              year: "",
              client: "",
              type: "",
              category: "",
              size: "",
              status: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
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
                    {status && <div style={style.error}>{status}</div>}
                    <ErrorMessage
                      component="div"
                      name="name"
                      style={style.error}
                    />
                  </Box>

                  <Box sx={style.form}>
                    <Typography variant="body2">Location</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="location"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="location"
                      style={style.error}
                    />
                  </Box>

                  <Box sx={style.form}>
                    <Typography variant="body2">Year</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="year"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="year"
                      style={style.error}
                    />
                  </Box>

                  <Box sx={style.form}>
                    <Typography variant="body2">Client</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="client"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="client"
                      style={style.error}
                    />
                  </Box>

                  <Box sx={style.form}>
                    <Typography variant="body2">Type</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="type"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="type"
                      style={style.error}
                    />
                  </Box>

                  <Box sx={style.form}>
                    <Typography variant="body2">Category</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="category"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="category"
                      style={style.error}
                    />
                  </Box>

                  <Box sx={style.form}>
                    <Typography variant="body2">Size</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="size"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="size"
                      style={style.error}
                    />
                  </Box>

                  <Box sx={style.form}>
                    <Typography variant="body2">Status</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="status"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="status"
                      style={style.error}
                    />
                  </Box>

                  <Grid sx={style.upload} onClick={handleUpload}>
                    <input
                      multiple
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    {image && image.length > 0 ? (
                      image?.map((data, index) => (
                        <Typography
                          key={index}
                          variant="body1"
                          sx={{ color: "black" }}
                        >
                          {data.name}
                        </Typography>
                      ))
                    ) : (
                      <CameraAltIcon sx={style.imgIcon} />
                    )}
                  </Grid>

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

export default AddProject;
