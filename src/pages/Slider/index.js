import {
  Box,
  Grid,
  Alert,
  Slide,
  Snackbar,
  ImageList,
  IconButton,
  Typography,
  ImageListItem,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";

import style from "./styles";
import Layout from "../../components/Layout";

const Slider = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [image, setImage] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [deleteImageError, setDeleteImageError] = useState(false);
  const [deleteImageSuccess, setDeleteImageSuccess] = useState(false);

  useEffect(() => {
    setLoadingImage(true);

    axios
      .get(`${baseUrl}/slider/getSlider`)
      .then((resp) => {
        const img = resp.data.data;
        setImage(img);
        setLoadingImage(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingImage(false);
      });
  }, [baseUrl]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleDeleteClick = async (id) => {
    setLoadingImage(true);

    try {
      await axios.delete(`${baseUrl}/slider/deleteSlider`, {
        data: { id },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoadingImage(false);
      setImage((prevItems) => prevItems.filter((item) => item.id !== id));
      setDeleteImageSuccess(true);
    } catch (error) {
      setLoadingImage(false);
      console.error("Error deleting item:", error);
      setDeleteImageError(true);
    }
  };

  return (
    <Layout>
      <Snackbar
        open={deleteImageError}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => {
          setDeleteImageError(false);
        }}
        TransitionProps={{ direction: "left" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert sx={style.field} severity={"error"}>
          <Typography variant="body1">
            Error deleting image! Try again!
          </Typography>
        </Alert>
      </Snackbar>

      <Snackbar
        open={deleteImageSuccess}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => {
          setDeleteImageSuccess(false);
        }}
        TransitionProps={{ direction: "left" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert sx={style.field} severity={"success"}>
          <Typography variant="body1">Image deleted successfully!</Typography>
        </Alert>
      </Snackbar>

      <Grid container sx={style.wrapper}>
        <Grid
          item
          lg={10}
          md={10}
          sm={12}
          xs={12}
          gap={4}
          container
          sx={style.container}
        >
          <Typography variant="h4">All Slider Images</Typography>

          {loadingImage ? (
            <Box sx={style.loader}>
              <CircularProgress sx={style.loaderColor} />
            </Box>
          ) : (
            <ImageList sx={style.imgList} cols={3} rowHeight={164}>
              {image?.map((item, index) => (
                <ImageListItem
                  key={index}
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  <img loading="lazy" alt={item.id} src={item.image} />
                  {hoveredIndex === index && (
                    <IconButton
                      style={{
                        zIndex: 1,
                        top: "5px",
                        right: "5px",
                        position: "absolute",
                        justifySelf: "center",
                        backgroundColor: "#e81a1a",
                      }}
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      <DeleteIcon sx={{ color: "white" }} />
                    </IconButton>
                  )}
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Slider;
