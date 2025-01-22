import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Offcanvas, Form, Button } from "react-bootstrap";
import "../assets/css/App.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import logo from "../assets/images/logo.png";

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <header className="HeaderContainer">
      <Navbar expand="sm">
          {/* Logo Section */}
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img src={logo} alt="Logo" style={{ height: "100px" }} />
          </Navbar.Brand>

          {/* Toggle Icon */}
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-sm"
            className="ms-auto"
          />

        {/* Offcanvas Menu */}
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="start"
        >
          <Offcanvas.Header closeButton>
        
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* Navigation Links */}
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/">
                <span className="DefaultFontColor">Home</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/DIY">
                <span className="DefaultFontColor">DIY</span>
              </Nav.Link>
             

              {user && (
                <NavDropdown
                  title="Profile"
                  id="offcanvasNavbarDropdown-profile-expand-sm"
                >
                
                  <NavDropdown.Item as={Link} to="/YourBookings">
                    <span className="DefaultFontColor">Your Bookings</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/YourChats">
                    <span className="DefaultFontColor">Messages</span>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <NavDropdown
                title="About"
                id="offcanvasNavbarDropdown-about-expand-sm"
              >
                <NavDropdown.Item as={Link} to="/aboutUs">
                  <span className="DefaultFontColor">About Us</span>
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/testimonials">
                  <span className="DefaultFontColor">Testimonials</span>
                </NavDropdown.Item>
               
              </NavDropdown>
            </Nav>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </header>
  );
};

export default Header;
