import {
  Box,
  Grid,
  Alert,
  Slide,
  Select,
  Button,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import style from "./style";
import Layout from "../../components/Layout";

const EditBlog = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const fileInputRef = useRef(null);
  const initialBlogDetails = state?.row;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState(
    initialBlogDetails?.category || ""
  );

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${baseUrl}/blog/getBlogCategories`)
      .then((resp) => {
        const cat = resp.data.data;
        setCategory(cat);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [baseUrl]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required!"),
    author: Yup.string().required("Required!"),
    tags: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
  });

  const handleChange = (event, setFieldValue) => {
    const selected = category.find((data) => data.name === event.target.value);

    setFieldValue("category", selected ? selected.id : null);
    setCategoryName(event.target.value);
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImage(files);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const postData = {
      ...values,
      id: initialBlogDetails.id,
      image: image && image.length > 0 ? image[0] : null,
    };

    axios
      .post(`${baseUrl}/blog/updateBlog`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        if (resp.data.success) {
          setSubmitting(false);
          navigate("/blogs");
        } else {
          setSubmitting(false);
          setError(true);
        }
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
            Error posting blog! Try again!
          </Typography>
        </Alert>
      </Snackbar>

      <Grid container sx={style.wrapper}>
        <Grid item lg={9} md={9} sm={12} xs={12} container sx={style.container}>
          <Typography variant="h4">Update Blog</Typography>
          <Typography variant="body2" sx={style.space}>
            Please update details of the Blog.
          </Typography>

          <Formik
            initialValues={{
              title: initialBlogDetails?.title || "",
              author: initialBlogDetails?.author || "",
              tags: initialBlogDetails?.tags || "",
              description: initialBlogDetails?.description || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
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
                    {loading ? (
                      <Box sx={style.loader}>
                        <CircularProgress sx={style.loaderColor} />
                      </Box>
                    ) : (
                      <Select
                        fullWidth
                        size="small"
                        sx={style.select}
                        value={categoryName}
                        id="demo-simple-select"
                        onChange={(event) => handleChange(event, setFieldValue)}
                      >
                        <MenuItem
                          value={initialBlogDetails.category}
                        ></MenuItem>
                        {category?.map((data) => (
                          <MenuItem key={data.id} value={data.name}>
                            {data.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
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
                          alt={index}
                          width={200}
                          height={150}
                          src={URL.createObjectURL(file)}
                        />
                      ))}
                      <Grid item sx={style.upload} onClick={handleUpload}>
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
                    <Grid gap={2} container sx={style.display}>
                      <img
                        alt="blog"
                        width={200}
                        height={150}
                        src={initialBlogDetails.image_url}
                      />

                      <Grid item sx={style.upload} onClick={handleUpload}>
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

export default EditBlog;
