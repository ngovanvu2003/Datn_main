import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";
import Modal from "../components/admin/Modal";
import Aside from "../components/admin/Aside";

const AdminLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggleDropdownAll = () => {
    setOpen(false);
  };
  const toggleDropdown = () => {
    setOpen(!open);
  };
  return (
    <div className="footer-offset footer-offset has-navbar-vertical-aside navbar-vertical-aside-show-xl">
      <Header toggle={toggleDropdown} open={open} />
      <div
        className="
            hidden
            md:block
          "
        onClick={toggleDropdownAll}
      >
        <Aside />
      </div>
      <main
        id="content"
        role="main"
        className="main pointer-event"
        onClick={toggleDropdownAll}
      >
        <div className="content container-fluid">
          <Outlet />
        </div>
        <Footer />
        <Modal />
      </main>
    </div>
  );
};

export default AdminLayout;
