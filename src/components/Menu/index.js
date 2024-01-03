import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, Toolbar } from "@mui/material";

import SideMenu from "../SideMenu";

export default function Menu() {
  const drawerWidth = 240;
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  return (
    <Box>
      <Toolbar>
        <MenuIcon onClick={handleDrawerOpen} />
      </Toolbar>

      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#2a2d3e",
          },
        }}
        anchor="left"
        open={openDrawer}
        variant="persistent"
      >
        <SideMenu />
      </Drawer>
    </Box>
  );
}
