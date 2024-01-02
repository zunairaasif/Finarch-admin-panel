import {
  Box,
  Grid,
  Paper,
  Table,
  Alert,
  Slide,
  Snackbar,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useContext, useState, useEffect } from "react";

import style from "./style";
import { UserContext } from "../../context";
import Layout from "../../components/Layout";

const Services = () => {
  const { user } = useContext(UserContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [page, setPage] = useState(0);
  const [services, setServices] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);

  const columns = [
    { id: "id", label: "ID" },
    { id: "service_name", label: "Service Name" },
    { id: "rate", label: "Rate" },
    { id: "subServices", label: "Sub Services" },
    { id: "action", label: "Actions" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const handleDelete = async (id) => {
    setLoadingServices(true);

    try {
      await axios.delete(`${baseUrl}/service/deleteServices`, {
        data: { id },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoadingServices(false);
      setServices((prevItems) => prevItems.filter((item) => item.id !== id));
      setDeleteSuccess(true);
    } catch (error) {
      setLoadingServices(false);
      console.error("Error deleting item:", error);
      setDeleteError(true);
    }
  };

  return (
    <Layout>
      <Snackbar
        open={deleteError}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => {
          setDeleteError(false);
        }}
        TransitionProps={{ direction: "left" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert sx={style.field} severity={"error"}>
          <Typography variant="body1">
            Error deleting record! Try again!
          </Typography>
        </Alert>
      </Snackbar>

      <Snackbar
        open={deleteSuccess}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => {
          setDeleteSuccess(false);
        }}
        TransitionProps={{ direction: "left" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert sx={style.field} severity={"success"}>
          <Typography variant="body1">Record deleted successfully!</Typography>
        </Alert>
      </Snackbar>

      <Grid container sx={style.spacing}>
        <Typography variant="h5">View all Services</Typography>

        <Box sx={style.user}>
          <Typography variant="body1">{user}</Typography>
        </Box>
      </Grid>

      <Grid container sx={style.table}>
        {loadingServices ? (
          <Box sx={style.loader}>
            <CircularProgress sx={style.loaderColor} />
          </Box>
        ) : (
          <Paper sx={style.paper}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={style.cell}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {services
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ color: "white" }}
                              >
                                {column.format && typeof value === "number" ? (
                                  column.format(value)
                                ) : column.id === "subServices" ? (
                                  row.subServices
                                    ?.map((data) => data.name)
                                    .join(", ")
                                ) : column.id === "action" ? (
                                  <Box
                                    gap={2}
                                    sx={{
                                      display: "flex",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        ...style.action,
                                        backgroundColor: "#0bce05",
                                      }}
                                    >
                                      <EditIcon />
                                    </Box>

                                    <Box
                                      sx={{
                                        ...style.action,
                                        backgroundColor: "#e81a1a",
                                      }}
                                      onClick={() => handleDelete(row.id)}
                                    >
                                      <CloseIcon />
                                    </Box>
                                  </Box>
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              page={page}
              component="div"
              sx={{ color: "white" }}
              count={services.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[10, 25, 50]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </Grid>
    </Layout>
  );
};

export default Services;
