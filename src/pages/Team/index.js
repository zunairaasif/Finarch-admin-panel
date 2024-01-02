import {
  Box,
  Grid,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useContext, useState, useEffect } from "react";

import style from "./style";
import { UserContext } from "../../context";
import Layout from "../../components/Layout";

const Team = () => {
  const { user } = useContext(UserContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [page, setPage] = useState(0);
  const [team, setTeam] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loadingTeam, setLoadingTeam] = useState(false);

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "job_post", label: "Designation" },
    { id: "qualification", label: "Qualification" },
    { id: "image_url", label: "Image" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setLoadingTeam(true);

    axios
      .get(`${baseUrl}/team/getTeam`)
      .then((resp) => {
        const member = resp.data.data;
        setTeam(member);
        setLoadingTeam(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingTeam(false);
      });
  }, [baseUrl]);

  return (
    <Layout>
      <Grid container sx={style.spacing}>
        <Typography variant="h5">View all Team Members</Typography>

        <Box sx={style.user}>
          <Typography variant="body1">{user}</Typography>
        </Box>
      </Grid>

      <Grid container sx={style.table}>
        {loadingTeam ? (
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
                  {team
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
                                ) : column.id === "image_url" ? (
                                  <img
                                    src={row.image_url}
                                    alt={row.id}
                                    width={50}
                                  />
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
              count={team.length}
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

export default Team;
