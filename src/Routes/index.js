import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Team from "../pages/Team";
import Login from "../pages/Login";
import Blogs from "../pages/Blogs";
import Users from "../pages/Users";
import Slider from "../pages/Slider";
import Projects from "../pages/Projects";
import Services from "../pages/Services";
import Location from "../pages/Location";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Inquiries from "../pages/Inquiries";
import Quotations from "../pages/Quotation";
import AddUser from "../pages/Users/AddUser";
import AddBlog from "../pages/Blogs/AddBlog";
import AddSlider from "../pages/Slider/AddSlider";
import AddProject from "../pages/Projects/AddProject";
import AddService from "../pages/Services/AddService";
import SubService from "../pages/Services/SubServices";
import AddTeamMember from "../pages/Team/AddTeamMember";
import AddLocation from "../pages/Location/AddLocation";
import AddSubService from "../pages/Services/AddSubService";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute />}>
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
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-sub-service" element={<AddSubService />} />
          <Route path="/sub-services" element={<SubService />} />
          <Route path="/add-service" element={<AddService />} />
          <Route path="/services" element={<Services />} />
          <Route path="/add-location" element={<AddLocation />} />
          <Route path="/offices" element={<Location />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
