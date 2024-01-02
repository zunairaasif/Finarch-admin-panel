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
import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useContext, useState, useEffect } from "react";

import style from "./styles";
import { UserContext } from "../../context";
import Layout from "../../components/Layout";

const Inquiries = () => {
  const { user } = useContext(UserContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [page, setPage] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "phone", label: "Phone" },
    { id: "message", label: "Message" },
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
    setLoadingContacts(true);

    axios
      .get(`${baseUrl}/contact/getContactForms`)
      .then((resp) => {
        const cnt = resp.data.data;
        cnt.sort((a, b) => b.id - a.id);
        setContacts(cnt);
        setLoadingContacts(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingContacts(false);
      });
  }, [baseUrl]);

  const handleDialPadClick = (phoneNumber) => {
    const dialPadUrl = `tel:${phoneNumber}`;
    window.open(dialPadUrl);
  };

  const handleWhatsAppClick = (phoneNumber) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDelete = async (id) => {
    setLoadingContacts(true);

    try {
      await axios.delete(`${baseUrl}/contact/deleteInquiry`, {
        data: { id },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoadingContacts(false);
      setContacts((prevItems) => prevItems.filter((item) => item.id !== id));
      setDeleteSuccess(true);
    } catch (error) {
      setLoadingContacts(false);
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
        <Typography variant="h5">View all Inquiries</Typography>

        <Box sx={style.user}>
          <Typography variant="body1">{user}</Typography>
        </Box>
      </Grid>

      <Grid container sx={style.table}>
        {loadingContacts ? (
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
                  {contacts
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
                                        backgroundColor: "#ead53f",
                                      }}
                                      onClick={() =>
                                        handleDialPadClick(row.phone)
                                      }
                                    >
                                      <CallIcon />
                                    </Box>

                                    <Box
                                      sx={{
                                        ...style.action,
                                        backgroundColor: "#0bce05",
                                      }}
                                      onClick={() =>
                                        handleWhatsAppClick(row.phone)
                                      }
                                    >
                                      <WhatsAppIcon />
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
              count={contacts.length}
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

export default Inquiries;
