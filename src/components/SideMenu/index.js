import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { Box, Grid, List, ListItemButton, ListItemText } from "@mui/material";

import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/Inbox";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import WidgetsIcon from "@mui/icons-material/Widgets";
import GridViewIcon from "@mui/icons-material/GridView";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PieChartIcon from "@mui/icons-material/PieChart";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CollectionsIcon from "@mui/icons-material/Collections";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import style from "./style";
import { AuthContext } from "../../context";
import logo from "../../images/logo-white.svg";

const SideMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setToken } = useContext(AuthContext);
  const [openTeam, setOpenTeam] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openProjects, setOpenProjects] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    setToken(true);
    navigate("/");
  };

  return (
    <Grid container item lg={2.15} md={2.15} sm={2.15} style={style.sideMenu}>
      <Box sx={style.heading}>
        <img
          src={logo}
          width={150}
          alt="finarch logo"
          onClick={() => navigate("/dashboard")}
        />
      </Box>

      <List>
        <ListItemButton onClick={() => navigate("/dashboard")}>
          <GridViewIcon fontSize="small" sx={style.icon} />
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/quotations")}>
          <PieChartIcon fontSize="small" sx={style.icon} />
          <ListItemText primary="Quotations" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/inquiries")}>
          <InboxIcon fontSize="small" sx={style.icon} />
          <ListItemText primary="Inquiries" />
        </ListItemButton>

        <ListItemButton onClick={() => setOpen(!open)}>
          <WidgetsIcon fontSize="small" sx={style.icon} />
          <ListItemText primary="Home Slider" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/add-slider-image")}
          >
            <AddPhotoAlternateIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="Add Slider Image" />
          </ListItemButton>

          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/slider-images")}
          >
            <CollectionsIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="View All Slider Image" />
          </ListItemButton>
        </Collapse>

        <ListItemButton onClick={() => setOpenProjects(!openProjects)}>
          <AssignmentIcon fontSize="small" sx={style.icon} />
          <ListItemText primary="Projects" />
          {openProjects ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openProjects} timeout="auto" unmountOnExit>
          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/add-project")}
          >
            <PlaylistAddIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="Add New Project" />
          </ListItemButton>

          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/projects")}
          >
            <AssignmentIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="View All Projects" />
          </ListItemButton>
        </Collapse>

        <ListItemButton onClick={() => setOpenTeam(!openTeam)}>
          <GroupsIcon fontSize="small" sx={style.icon} />
          <ListItemText primary="Team" />
          {openTeam ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openTeam} timeout="auto" unmountOnExit>
          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/add-team-member")}
          >
            <PersonAddIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="Add New Team Member" />
          </ListItemButton>

          <ListItemButton sx={style.padding} onClick={() => navigate("/team")}>
            <GroupsIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="View Team" />
          </ListItemButton>
        </Collapse>

        <ListItemButton onClick={() => setOpenBlog(!openBlog)}>
          <NewspaperIcon fontSize="small" sx={style.icon} />
          <ListItemText primary="Blogs" />
          {openBlog ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openBlog} timeout="auto" unmountOnExit>
          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/add-blog")}
          >
            <AddBoxIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="Add New Blog" />
          </ListItemButton>

          <ListItemButton sx={style.padding} onClick={() => navigate("/blogs")}>
            <NewspaperIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="View All Blogs" />
          </ListItemButton>
        </Collapse>

        <ListItemButton onClick={() => setOpenUser(!openUser)}>
          <GroupIcon fontSize="small" sx={style.icon} />
          <ListItemText primary="Users" />
          {openUser ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openUser} timeout="auto" unmountOnExit>
          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/add-user")}
          >
            <PersonAddIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="Add New User" />
          </ListItemButton>

          <ListItemButton sx={style.padding} onClick={() => navigate("/users")}>
            <GroupIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="View All Users" />
          </ListItemButton>
        </Collapse>

        <ListItemButton onClick={() => setOpenServices(!openServices)}>
          <SupportAgentIcon fontSize="small" sx={style.icon} />
          <ListItemText primary="Services" />
          {openServices ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openServices} timeout="auto" unmountOnExit>
          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/add-sub-service")}
          >
            <NoteAddIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="Add New Sub Service" />
          </ListItemButton>

          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/add-service")}
          >
            <NoteAddIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="Add New Service" />
          </ListItemButton>

          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/sub-services")}
          >
            <SupportAgentIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="View All Sub Services" />
          </ListItemButton>

          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/services")}
          >
            <SupportAgentIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="View All Services" />
          </ListItemButton>
        </Collapse>

        <ListItemButton onClick={() => setOpenLocation(!openLocation)}>
          <LocationOnIcon fontSize="small" sx={style.icon} />
          <ListItemText primary="Office Locations" />
          {openLocation ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openLocation} timeout="auto" unmountOnExit>
          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/add-location")}
          >
            <AddLocationAltIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="Add New Office" />
          </ListItemButton>

          <ListItemButton
            sx={style.padding}
            onClick={() => navigate("/offices")}
          >
            <LocationOnIcon fontSize="small" sx={style.icon} />
            <ListItemText primary="View All Offices" />
          </ListItemButton>
        </Collapse>

        <ListItemButton onClick={handleLogout}>
          <LogoutIcon fontSize="small" sx={style.icon} />
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Grid>
  );
};

export default SideMenu;
