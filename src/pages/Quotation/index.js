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
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useContext, useState, useEffect } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import style from "./styles";
import { UserContext } from "../../context";
import Layout from "../../components/Layout";

const Quotation = () => {
  const { user } = useContext(UserContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [page, setPage] = useState(0);
  const [quotation, setQuotation] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loadingQuotation, setLoadingQuotation] = useState(false);

  useEffect(() => {
    setLoadingQuotation(true);
    axios
      .get(`${baseUrl}/quotes/getQuotes`)
      .then((resp) => {
        const quotes = resp.data.data;
        quotes.sort((a, b) => b.id - a.id);

        setQuotation(quotes);
        setLoadingQuotation(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingQuotation(false);
      });
  }, [baseUrl]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "contact_number", label: "Phone" },
    { id: "country", label: "Address" },
    { id: "propertySizeinSqft", label: "Size" },
    { id: "property_type", label: "Type" },
    { id: "service_names", label: "Services" },
    { id: "quotation_amount", label: "Amount" },
    { id: "action", label: "Actions" },
  ];

  const handleDialPadClick = (phoneNumber) => {
    const dialPadUrl = `tel:${phoneNumber}`;
    window.open(dialPadUrl);
  };

  const handleWhatsAppClick = (phoneNumber) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleMailClick = (emailAddress) => {
    const mailtoUrl = `mailto:${emailAddress}`;
    window.open(mailtoUrl);
  };

  const handleDeleteClick = async (id) => {
    setLoadingQuotation(true);

    try {
      await axios.delete(`${baseUrl}/quotes/deleteQuotation`, {
        data: { id },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoadingQuotation(false);
      setQuotation((prevItems) => prevItems.filter((item) => item.id !== id));
      setDeleteSuccess(true);
    } catch (error) {
      setLoadingQuotation(false);
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
        <Typography variant="h5">View all Quotation</Typography>

        <Box sx={style.user}>
          <Typography variant="body1">{user}</Typography>
        </Box>
      </Grid>

      <Grid container sx={style.table}>
        {loadingQuotation ? (
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
                  {quotation
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
                                ) : column.id === "propertySizeinSqft" ? (
                                  `${row["property_size"]} ${row["propertySizeinSqft"]}`
                                ) : column.id === "country" ? (
                                  `${row["house_plot"]} ${row["block"]} ${row["city"]} ${row["country"]}`
                                ) : column.id === "action" ? (
                                  <Box
                                    gap={1}
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
                                        handleWhatsAppClick(row.contact_number)
                                      }
                                    >
                                      <WhatsAppIcon />
                                    </Box>

                                    <Box
                                      sx={{
                                        ...style.action,
                                        backgroundColor: "#e525dc",
                                      }}
                                      onClick={() => handleMailClick(row.email)}
                                    >
                                      <MailIcon />
                                    </Box>

                                    <Box
                                      sx={{
                                        ...style.action,
                                        backgroundColor: "#e81a1a",
                                      }}
                                      onClick={() => handleDeleteClick(row.id)}
                                    >
                                      <CloseIcon />
                                    </Box>

                                    <Box
                                      sx={{
                                        ...style.action,
                                        backgroundColor: "#1ac1e8",
                                      }}
                                      onClick={() =>
                                        window.open(row.pdf_url, "_blank")
                                      }
                                    >
                                      <PictureAsPdfIcon />
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
              count={quotation.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[10, 25, 50, 100]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </Grid>
    </Layout>
  );
};

export default Quotation;
