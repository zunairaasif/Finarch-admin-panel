import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Team from "../pages/Team";
import Login from "../pages/Login";
import Blogs from "../pages/Blogs";
import Users from "../pages/Users";
import Slider from "../pages/Slider";
import Projects from "../pages/Projects";
import Location from "../pages/Location";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Inquiries from "../pages/Inquiries";
import Quotations from "../pages/Quotation";
import AddUser from "../pages/Users/AddUser";
import AddBlog from "../pages/Blogs/AddBlog";
import EditUser from "../pages/Users/EditUser";
import EditBlog from "../pages/Blogs/EditBlog";
import Services from "../pages/Services/Service";
import AddSlider from "../pages/Slider/AddSlider";
import SubService from "../pages/Services/SubService";
import AddProject from "../pages/Projects/AddProject";
import AddTeamMember from "../pages/Team/AddTeamMember";
import AddLocation from "../pages/Location/AddLocation";
import EditLocation from "../pages/Location/EditLocation";
import AddService from "../pages/Services/Service/AddService";
import EditService from "../pages/Services/Service/EditService";
import AddSubService from "../pages/Services/SubService/AddSubService";
import EditSubService from "../pages/Services/SubService/EditSubService";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quotations" element={<Quotations />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/add-slider-image" element={<AddSlider />} />
        <Route path="/slider-images" element={<Slider />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/add-team-member" element={<AddTeamMember />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/blogs/update-blog/:id" element={<EditBlog />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/users/update-user/:id" element={<EditUser />} />
        <Route path="/users" element={<Users />} />
        <Route path="/add-sub-service" element={<AddSubService />} />
        <Route
          path="/sub-services/update-sub-service/:id"
          element={<EditSubService />}
        />
        <Route path="/sub-services" element={<SubService />} />
        <Route path="/services" element={<Services />} />
        <Route path="/add-service" element={<AddService />} />
        <Route path="/services/update-service/:id" element={<EditService />} />
        <Route path="/add-location" element={<AddLocation />} />
        <Route path="/offices/update-location/:id" element={<EditLocation />} />
        <Route path="/offices" element={<Location />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

export default Routing;
