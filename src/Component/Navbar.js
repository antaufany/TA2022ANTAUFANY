import React, { useState } from "react";
import { Navbar, Container, Nav, Offcanvas, Image, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../Handler/AuthContext";
import { useHistory } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiMapPinAddLine } from "react-icons/ri";
import { BsFiles } from "react-icons/bs";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { BiHome } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

function Navbarx() {
  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("logout failed");
    }
  }

  return (
    <>
      <Navbar style={{ backgroundImage: "url(/img/bgbaru.png)" }} expand={false} className="d-flex justify-content-start">
        <Navbar.Toggle aria-controls="offcanvasNavbar" className=" m-2" />
        <Navbar.Brand href="/" className="text-white align-self-start flex-grow-1 m-2">
          <img alt="" src="img/putihpdam.png" width="30" height="30" className="d-inline align-top" /> DASHBOARD PDAM KABUPATEN MADIUN
        </Navbar.Brand>

        <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="start" style={{ maxWidth: 300 }}>
          <Offcanvas.Header className="p-0">
            <Image fluid src="/img/BG.png" />
          </Offcanvas.Header>
          <Offcanvas.Body className="we">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link className="text-black" href="/">
                <BiHome className="m-1" /> Home
              </Nav.Link>
              <Nav.Link className="text-black" href="/edit">
                <BsFiles className="m-1" /> Portable APP
              </Nav.Link>
              <Nav.Link className="text-black" href="/adddata">
                <RiMapPinAddLine className="m-1" /> Add New Data
              </Nav.Link>
              <Nav.Link className="text-black" href="/history">
                <IoPhonePortraitOutline className="m-1" /> EWS APP
              </Nav.Link>
              <Nav.Link className="text-black" href="/monitoring">
                <IoPhonePortraitOutline className="m-1" />
                Monitoring Portable APP
              </Nav.Link>
              <NavDropdown.Divider />
              <Nav.Link className="text-black" onClick={handleLogout}>
                <MdLogout className="m-1" />
                Logout
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Button className="align-self-end h-25 w-20 m-2">
          <FaUser />
          {currentUser.email}
        </Button>
      </Navbar>
    </>
  );
}

export default Navbarx;
