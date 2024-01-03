import {
  Box,
  Grid,
  Alert,
  Slide,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CircularProgress from "@mui/material/CircularProgress";

import style from "./styles";
import Layout from "../../components/Layout";

const AddSlider = () => {
  const fileInputRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImage(files);
  };

  const handleSubmit = () => {
    setLoading(true);

    const postData = {
      image: image[0],
      is_active: 1,
    };

    axios
      .post(`${baseUrl}/slider/post`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setImage(null);
      })
      .catch((error) => {
        console.error("Uploading Error:", error);
        setLoading(false);
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
        <Grid
          item
          lg={10}
          md={10}
          sm={12}
          xs={12}
          container
          sx={style.container}
        >
          <Typography variant="h4">Add New Slider Images</Typography>
          <Typography variant="body2">
            Please Upload Slider Image to be shown on Home Page one by one
          </Typography>

          {loading ? (
            <Box sx={style.loader}>
              <CircularProgress sx={style.loaderColor} />
            </Box>
          ) : (
            <>
              <Grid sx={style.upload} onClick={handleUpload}>
                <input
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

              <Button variant="contained" sx={style.btn} onClick={handleSubmit}>
                Submit
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AddSlider;
