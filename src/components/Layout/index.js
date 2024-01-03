import React from "react";
import { Grid, useTheme, useMediaQuery } from "@mui/material";

import Menu from "../Menu";
import style from "./style";
import SideMenu from "../SideMenu";

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid container sx={style.dashboard}>
      {isMatch ? <SideMenu /> : <Menu />}
      <Grid item lg={9.85} md={9.85} sm={9} sx={style.content}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
