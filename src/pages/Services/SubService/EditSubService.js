import {
  Box,
  Grid,
  Alert,
  Slide,
  Button,
  Select,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import style from "../style";
import Layout from "../../../components/Layout";

const EditSubService = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialSubServiceDetails = state?.row;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [error, setError] = useState(false);
  const [service, setService] = useState(
    initialSubServiceDetails?.service_name || ""
  );
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);

  const validationSchema = Yup.object().shape({
    service_id: Yup.string().required("Required!"),
    name: Yup.string().required("Required!"),
    weightage: Yup.string().required("Required!"),
  });

  useEffect(() => {
    setLoadingServices(true);

    axios
      .get(`${baseUrl}/service/getAllServices`)
      .then((resp) => {
        const service = resp.data.data;
        setServices(service);
        setLoadingServices(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingServices(false);
      });
  }, [baseUrl]);

  const handleChange = (event, setFieldValue) => {
    const selectedService = services.find(
      (data) => data.service_name === event.target.value
    );

    setFieldValue("service_id", selectedService ? selectedService.id : null);
    setService(event.target.value);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const postData = {
      ...values,
      id: initialSubServiceDetails.id,
    };

    axios
      .post(`${baseUrl}/service/updateSubService`, postData)
      .then(() => {
        setSubmitting(false);
        navigate("/sub-services");
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
            Error posting sub service! Try again!
          </Typography>
        </Alert>
      </Snackbar>

      <Grid container sx={style.wrapper}>
        <Grid item lg={9} md={9} sm={12} xs={12} container sx={style.container}>
          <Typography variant="h4">Update Sub Service</Typography>
          <Typography variant="body2" sx={style.space}>
            Please update the details of Sub Service.
          </Typography>

          <Formik
            initialValues={{
              name: initialSubServiceDetails?.name || "",
              weightage: initialSubServiceDetails?.weightage || "",
              service_id: initialSubServiceDetails?.service_id || null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form style={style.form}>
                <Grid container gap={1} sx={style.block}>
                  {loadingServices ? (
                    <Box sx={style.loader}>
                      <CircularProgress sx={style.loaderColor} />
                    </Box>
                  ) : (
                    <Box sx={style.form}>
                      <Typography variant="body2">
                        Select a service for which you want to add sub service
                      </Typography>
                      <Select
                        fullWidth
                        size="small"
                        value={service}
                        sx={style.select}
                        // name="service_id"
                        id="demo-simple-select"
                        onChange={(event) => handleChange(event, setFieldValue)}
                      >
                        {services?.map((data) => (
                          <MenuItem key={data.id} value={data.service_name}>
                            {data.service_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage
                        component="div"
                        name="service_id"
                        style={style.error}
                      />
                    </Box>
                  )}

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
                    <Typography variant="body2">Weightage</Typography>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      name="weightage"
                      variant="outlined"
                      style={style.field}
                    />
                    <ErrorMessage
                      component="div"
                      name="weightage"
                      style={style.error}
                    />
                  </Box>

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

export default EditSubService;
