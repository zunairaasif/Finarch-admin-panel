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
import React, { useState, useRef } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Formik, Form, Field, ErrorMessage } from "formik";

import style from "./style";
import Layout from "../../components/Layout";

const AddBlog = () => {
  const fileInputRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required!"),
    author: Yup.string().required("Required!"),
    category: Yup.string().required("Required!"),
    tags: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
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

    const formData = new FormData();

    for (const img of image) {
      formData.append("image", img);
    }

    formData.append("id", values.id);
    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("category", values.category);
    formData.append("tags", values.tags);
    formData.append("description", values.description);

    axios
      .post(`${baseUrl}/blog/postBlog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        if (resp.data.success) {
          setSubmitting(false);
          setSuccess(true);
          setImage(null);
          resetForm();
        } else {
          setSubmitting(false);
          setError(true);
        }
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
            Error posting blog! Try again!
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
          <Typography variant="body1">Blog posted successfully!</Typography>
        </Alert>
      </Snackbar>

      <Grid container sx={style.wrapper}>
        <Grid item lg={9} md={9} sm={12} xs={12} container sx={style.container}>
          <Typography variant="h4">Add New Blog</Typography>
          <Typography variant="body2" sx={style.space}>
            Please enter details of the Blog.
          </Typography>

          <Formik
            initialValues={{
              title: "",
              author: "",
              category: "",
              tags: "",
              description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form style={style.form}>
                <Grid container gap={1} sx={style.block}>
                  <Box sx={style.form}>
                    <Typography variant="body2">Title</Typography>
                    <Field
                      fullWidth
                      size="small"
                      name="title"
                      margin="dense"
                      as={TextField}
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="title"
                      style={style.error}
                    />
                  </Box>

                  <Box sx={style.form}>
                    <Typography variant="body2">Author</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="author"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="author"
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
                    <Typography variant="body2">Tags</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="tags"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="tags"
                      style={style.error}
                    />
                  </Box>

                  <Box sx={style.form}>
                    <Typography variant="body2">Description</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="description"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="description"
                      style={style.error}
                    />
                  </Box>

                  <Typography variant="body2">
                    Please attach the Image of the Blog.
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

export default AddBlog;
