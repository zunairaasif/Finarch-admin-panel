const style = {
  //********* Common ********* */

  wrapper: {
    mt: 3,
  },
  container: {
    p: 3,
    display: "flex",
    borderRadius: 2,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#2a2d3e",
  },

  //********* Add Slider Image ********* */

  display: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  upload: {
    p: 7,
    mt: 3,
    mb: 3,
    display: "flex",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  imgIcon: {
    color: "grey",
    fontSize: 50,
  },
  btn: {
    width: "40%",
    color: "black",
    textTransform: "none",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
    },
  },

  //********* View Slider Image ********* */

  imgList: {
    height: 400,
    width: "100%",
  },
  loaderColor: {
    color: "white",
  },
  loader: {
    mt: 2,
    display: "flex",
    justifyContent: "center",
  },
  hover: {
    zIndex: 1,
    top: "5px",
    right: "5px",
    position: "absolute",
    justifySelf: "center",
    backgroundColor: "#e81a1a",
    "&:hover": {
      backgroundColor: "#e81a1a",
    },
  },
};

export default style;
