const style = {
  container: {
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  form: {
    width: "100%",
  },
  field: {
    borderRadius: 4,
    backgroundColor: "white",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  button: {
    mt: 5,
    p: "10px",
    width: "70%",
    color: "black",
    fontWeight: "bold",
    textTransform: "none",
    backgroundColor: "white",
    "&:hover": {
      color: "black",
      backgroundColor: "white",
    },
  },
  alert: {
    alignItems: "center",
  },
};

export default style;
