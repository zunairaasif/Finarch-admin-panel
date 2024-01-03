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

  const [image, setImage] = useState([]);
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
    console.log("image", files);
    setImage(files);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const formData = new FormData();

    for (const img of image) {
      formData.append("project_images", img);
    }

    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("year", values.year);
    formData.append("client", values.client);
    formData.append("type", values.type);
    formData.append("category", values.category);
    formData.append("size", values.size);
    formData.append("status", values.status);

    axios
      .post(`${baseUrl}/projects/postProject`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        if (resp.data.success) {
          setSubmitting(false);
          setSuccess(true);
          setImage([]);
          resetForm();
        } else {
          console.log(resp.data);
          setSubmitting(false);
          setError(true);
        }
      })
      .catch((error) => {
        console.error("Uploading Error:", error);
        setSubmitting(false);
        setError(true);
        setImage([]);
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
            Error posting project! Try again!
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
          <Typography variant="body1">Project posted successfully!</Typography>
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

                  <Typography variant="body2">
                    Please attach the Porfolio Image of the Project in the
                    sequence you want to be displayed on the website.
                  </Typography>
                  {image && image.length > 0 ? (
                    <Grid gap={2} container sx={style.display}>
                      {image.map((file, index) => (
                        <img
                          key={index}
                          width={200}
                          height={160}
                          alt={`Preview ${index + 1}`}
                          src={URL.createObjectURL(file)}
                        />
                      ))}
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
                          multiple
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
                        multiple
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

export default AddProject;
