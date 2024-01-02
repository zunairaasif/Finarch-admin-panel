const style = {
  //********* Common ********* */

  loaderColor: {
    color: "white",
  },
  loader: {
    mt: 2,
    display: "flex",
    justifyContent: "center",
  },

  //********* View Projects ********* */

  spacing: {
    justifyContent: "space-between",
  },
  user: {
    pt: 1,
    pb: 1,
    pl: 3,
    pr: 3,
    borderRadius: 2,
    backgroundColor: "#2a2d3e",
    border: "1px solid #3b3e4e",
  },
  table: {
    p: 2,
    mt: 2,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#2a2d3e",
  },
  paper: {
    width: "100%",
    color: "white",
    overflow: "hidden",
    backgroundColor: "#2a2d3e",
  },
  cell: {
    color: "white",
    backgroundColor: "#2a2d3e",
  },
  action: {
    p: "5px",
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
  },

  //********* Add Projects ********* */

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
};

export default style;
