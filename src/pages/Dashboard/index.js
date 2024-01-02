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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

import style from "./style";
import teams from "../../images/team.jpg";
import blogs from "../../images/blog.jpg";
import { UserContext } from "../../context";
import Layout from "../../components/Layout";
import projects from "../../images/projects.jpg";
import quotation from "../../images/quotation.jpg";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [page, setPage] = useState(0);
  const [page2, setPage2] = useState(0);
  const [quote, setQuote] = useState(0);
  const [team, setTeam] = useState(null);
  const [blog, setBlog] = useState(null);
  const [project, setProject] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [quoteTable, setQuoteTable] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowsPerPage2, setRowsPerPage2] = useState(10);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingQuotation, setLoadingQuotation] = useState(false);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [deleteContactError, setDeleteContactError] = useState(false);
  const [deleteContactSuccess, setDeleteContactSuccess] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePage2 = (event, newPage) => {
    setPage2(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(+event.target.value);
    setPage2(0);
  };

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "contact_number", label: "Mobile" },
    { id: "service_names", label: "Service" },
    { id: "propertySizeinSqft", label: "Size" },
    { id: "quotation_amount", label: "Amount" },
    { id: "action", label: "Actions" },
  ];

  const contactColumns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "phone", label: "Mobile" },
    { id: "message", label: "Message" },
    { id: "action", label: "Actions" },
  ];

  useEffect(() => {
    setLoadingTeam(true);

    axios
      .get(`${baseUrl}/projects/getAllProjects`)
      .then((resp) => {
        const projects = resp.data.data;
        console.log(projects);
        setProject(projects.length);
        setLoadingProjects(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingProjects(false);
      });
  }, [baseUrl, project]);

  useEffect(() => {
    setLoadingTeam(true);

    axios
      .get(`${baseUrl}/team/getTeam`)
      .then((resp) => {
        const tm = resp.data.data;
        setTeam(tm.length);
        setLoadingTeam(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingTeam(false);
      });
  }, [baseUrl, team]);

  useEffect(() => {
    setLoadingQuotation(true);
    axios
      .get(`${baseUrl}/quotes/getQuotes`)
      .then((resp) => {
        const quotes = resp.data.data;
        quotes.sort((a, b) => b.id - a.id);
        setQuoteTable(quotes);

        setQuote(quotes.length);
        setLoadingQuotation(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingQuotation(false);
      });
  }, [baseUrl, quote]);

  useEffect(() => {
    setLoadingBlogs(true);

    axios
      .get(`${baseUrl}/blog/getBlogs`)
      .then((resp) => {
        const blg = resp.data.data;
        setBlog(blg.length);
        setLoadingBlogs(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingBlogs(false);
      });
  }, [baseUrl, blog]);

  useEffect(() => {
    setLoadingInquiries(true);

    axios
      .get(`${baseUrl}/contact/getContactForms`)
      .then((resp) => {
        const cnt = resp.data.data;
        cnt.sort((a, b) => b.id - a.id);
        setContacts(cnt);
        setLoadingInquiries(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingInquiries(false);
      });
  }, [baseUrl]);

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
      setQuoteTable((prevItems) => prevItems.filter((item) => item.id !== id));
      setDeleteSuccess(true);
    } catch (error) {
      setLoadingQuotation(false);
      console.error("Error deleting item:", error);
      setDeleteError(true);
    }
  };

  const handleDialPadClick = (phoneNumber) => {
    const dialPadUrl = `tel:${phoneNumber}`;
    window.open(dialPadUrl);
  };

  const handleWhatsAppClick = (phoneNumber) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDelete = async (id) => {
    setLoadingInquiries(true);

    try {
      await axios.delete(`${baseUrl}/contact/deleteInquiry`, {
        data: { id },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoadingInquiries(false);
      setContacts((prevItems) => prevItems.filter((item) => item.id !== id));
      setDeleteContactSuccess(true);
    } catch (error) {
      setLoadingInquiries(false);
      console.error("Error deleting item:", error);
      setDeleteContactError(true);
    }
  };

  return (
    <Layout>
      <Snackbar
        open={deleteError || deleteContactError}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => {
          setDeleteError(false) || setDeleteContactError(false);
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
        open={deleteSuccess || deleteContactSuccess}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => {
          setDeleteSuccess(false) || setDeleteContactSuccess(false);
        }}
        TransitionProps={{ direction: "left" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert sx={style.field} severity={"success"}>
          <Typography variant="body1">Record deleted successfully!</Typography>
        </Alert>
      </Snackbar>

      <Grid container sx={style.spacing}>
        <Box gap={2} sx={style.wrap}>
          <Typography variant="h6">Dashboard</Typography>
          <Typography variant="h6">Finarch Web Statistics</Typography>
        </Box>

        <Box sx={style.user}>
          <Typography variant="body1">{user}</Typography>
        </Box>
      </Grid>

      <Grid container sx={style.display}>
        <Grid item lg={8.5} md={12} sm={12} gap={3} sx={style.wrap}>
          <Grid container sx={style.spacing}>
            <Box gap={3} sx={style.dashboard}>
              <img src={projects} alt="projects" width={50} />
              {loadingProjects ? (
                <CircularProgress sx={style.loaderColor} />
              ) : (
                <Box gap={1} sx={style.wrap}>
                  <Typography variant="body1">Projects</Typography>
                  <Typography variant="body2">{project} Projects</Typography>
                </Box>
              )}
            </Box>

            <Box gap={3} sx={style.dashboard}>
              <img src={quotation} alt="quotation" width={50} />
              {loadingQuotation ? (
                <CircularProgress sx={style.loaderColor} />
              ) : (
                <Box gap={1} sx={style.wrap}>
                  <Typography variant="body1">Quotations</Typography>
                  <Typography variant="body2">
                    {quote} Quotations Sent
                  </Typography>
                </Box>
              )}
            </Box>

            <Box gap={3} sx={style.dashboard}>
              <img src={blogs} alt="blogs" width={50} />
              {loadingBlogs ? (
                <CircularProgress sx={style.loaderColor} />
              ) : (
                <Box gap={1} sx={style.wrap}>
                  <Typography variant="body1">Blogs</Typography>
                  <Typography variant="body2">{blog} Blogs</Typography>
                </Box>
              )}
            </Box>

            <Box gap={3} sx={style.dashboard}>
              <img src={teams} alt="team" width={50} />
              {loadingTeam ? (
                <CircularProgress sx={style.loaderColor} />
              ) : (
                <Box gap={1} sx={style.wrap}>
                  <Typography variant="body1">Team Members</Typography>
                  <Typography variant="body2">{team} Members</Typography>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid container sx={style.quotation}>
            <Typography variant="body1">Recent Quotations</Typography>
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
                      {quoteTable
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
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
                                    {column.format &&
                                    typeof value === "number" ? (
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
                                            backgroundColor: "#e81a1a",
                                          }}
                                          onClick={() =>
                                            handleDeleteClick(row.id)
                                          }
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
                  count={quote}
                  component="div"
                  sx={{ color: "white" }}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[10, 25, 50]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            )}
          </Grid>

          <Grid container sx={style.quotation}>
            <Typography variant="body1">Recent Inquiries</Typography>
            {loadingInquiries ? (
              <Box sx={style.loader}>
                <CircularProgress sx={style.loaderColor} />
              </Box>
            ) : (
              <Paper sx={style.paper}>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {contactColumns.map((column) => (
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
                        .slice(
                          page2 * rowsPerPage2,
                          page2 * rowsPerPage2 + rowsPerPage2
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.id}
                            >
                              {contactColumns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{ color: "white" }}
                                  >
                                    {column.format &&
                                    typeof value === "number" ? (
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
                  page={page2}
                  component="div"
                  sx={{ color: "white" }}
                  count={contacts.length}
                  rowsPerPage={rowsPerPage2}
                  onPageChange={handleChangePage2}
                  rowsPerPageOptions={[10, 25, 50]}
                  onRowsPerPageChange={handleChangeRowsPerPage2}
                />
              </Paper>
            )}
          </Grid>
        </Grid>

        <Grid
          item
          gap={5}
          lg={3.25}
          md={12}
          sm={12}
          xs={12}
          container
          sx={style.container}
        >
          <Typography variant="h6">Projects Details</Typography>

          {loadingProjects ? (
            <Box sx={style.loader}>
              <CircularProgress sx={style.loaderColor} />
            </Box>
          ) : (
            <>
              <Box gap={1} sx={style.wrapper}>
                <Typography variant="body1">Total Projects</Typography>
                <Typography variant="body1">{project}</Typography>
              </Box>

              <Box gap={2} sx={style.wrap}>
                <Box sx={style.design}>
                  <Box sx={style.alignment}>
                    <DesignServicesIcon sx={style.margin} />
                    <Typography variant="body2">Architecture Design</Typography>
                  </Box>
                  <Typography variant="body2">0 Projects</Typography>
                </Box>

                <Box sx={style.design}>
                  <Box sx={style.alignment}>
                    <DesignServicesIcon sx={style.margin} />
                    <Typography variant="body2">Interior Design</Typography>
                  </Box>
                  <Typography variant="body2">0 Projects</Typography>
                </Box>

                <Box sx={style.design}>
                  <Box sx={style.alignment}>
                    <DesignServicesIcon sx={style.margin} />
                    <Typography variant="body2">Town Planning</Typography>
                  </Box>
                  <Typography variant="body2">0 Projects</Typography>
                </Box>

                <Box sx={style.design}>
                  <Box sx={style.alignment}>
                    <DesignServicesIcon sx={style.margin} />
                    <Typography variant="body2">Landscape Design</Typography>
                  </Box>
                  <Typography variant="body2">0 Projects</Typography>
                </Box>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
