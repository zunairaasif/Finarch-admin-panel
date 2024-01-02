const style = {
  //********* Common ********* */

  wrapper: {
    mt: 3,
    justifyContent: "center",
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
};

export default style;
