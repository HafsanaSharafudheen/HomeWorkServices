import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Offcanvas, Form, Button } from "react-bootstrap";
import "../App.css";
import { useSelector } from "react-redux";
import { RootState } from '../../Redux/store';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <header className="HeaderContainer">
        <div className="row col-12 align-items-center">
          {/* Logo Section */}
          <div className="col-6 col-md-2 text-center text-md-start">
            <Navbar.Brand href="/">
              <img src={logo} alt="Logo" style={{ height: "80px" }} />
            </Navbar.Brand>
          </div>

          {/* Navigation Links */}
          <div className="col-12 col-md-6">
            {["sm"].map((expand) => (
              <Navbar key={expand} expand={expand} className="p-0">
                <Container fluid>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                        Navigation
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-center justify-content-md-start flex-grow-1 pe-3">
                        <Nav.Link as={Link} to="/">
                          <span className="DefaultFontColor">Home</span>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/services">
                          <span className="DefaultFontColor">Services</span>
                        </Nav.Link>
                        {user && (
                          <NavDropdown title="Profile" id={`offcanvasNavbarDropdown-profile-${expand}`}>
                            <NavDropdown.Item as={Link} to="/profile">
                              <span className="DefaultFontColor">Your Profile</span>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/bookings">
                              <span className="DefaultFontColor">Your Bookings</span>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/messages">
                              <span className="DefaultFontColor">Messages</span>
                            </NavDropdown.Item>
                          </NavDropdown>
                        )}
                        <NavDropdown title="About" id={`offcanvasNavbarDropdown-about-${expand}`}>
                          <NavDropdown.Item as={Link} to="/aboutUs">
                            <span className="DefaultFontColor">About Us</span>
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/testimonials">
                            <span className="DefaultFontColor">Testimonials</span>
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/faq">
                            <span className="DefaultFontColor">FAQ</span>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Nav>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            ))}
          </div>

          {/* Search Bar */}
          <div className="col-6 col-md-4 mt-3 mt-md-0 text-center text-md-end">
            <Form className="d-flex search-container">
              <div className="form-floating w-100">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="DefaultInput no-focus"
                  id="floatingInput"
                  aria-label="Search"
                />
                <label htmlFor="floatingInput">Search</label>
              </div>
              <Button className="DefaultButton ml-2" type="submit">
                <span className="DefaultFontColor">
                  <i className="fas fa-search"></i>
                </span>
              </Button>
            </Form>
          </div>
        </div>
    </header>
  );
};

export default Header;
