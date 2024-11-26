// import React from "react";
// import { Link } from "react-router-dom";
//import "../App.css"

// const Header: React.FC = () => {
//     return (
//         <header>
//             <div className="row conatiner DefaultBackground" >

//                 <nav className="navbar navbar-expand-lg navbar-light">

//                         <div className="col-md-6">
//                             {/* Toggle Button for Mobile */}
//                             <button
//                                 className="navbar-toggler"
//                                 type="button"
//                                 data-bs-toggle="collapse"
//                                 data-bs-target="#navbarNavDropdown"
//                                 aria-controls="navbarNavDropdown"
//                                 aria-expanded="false"
//                                 aria-label="Toggle navigation"
//                             >
//                                 <span className="navbar-toggler-icon"></span>
//                             </button>




//                             {/* Navbar Links */}
//                             <div className="collapse navbar-collapse" id="navbarNavDropdown">
//                                 <ul className="navbar-nav">
//                                     {/* Home */}
//                                     <li className="nav-item">
//                                         <Link className="nav-link" to="/">
//                                             <span className="DefaultFontColor">Home</span>
//                                         </Link>
//                                     </li>

//                                     {/* Services */}
//                                     <li className="nav-item">
//                                         <Link className="nav-link" to="/services">
//                                             <span className="DefaultFontColor">Services</span>
//                                         </Link>
//                                     </li>

//                                     {/* Profile Dropdown */}
//                                     <li className="nav-item dropdown">
//                                         <a
//                                             className="nav-link dropdown-toggle"
//                                             href="#"
//                                             id="profileDropdown"
//                                             role="button"
//                                             data-bs-toggle="dropdown"
//                                             aria-expanded="false"
//                                         >
//                                             <span className="DefaultFontColor">Profile</span>

//                                         </a>
//                                         <ul className="dropdown-menu" aria-labelledby="profileDropdown">
//                                             <li>
//                                                 <Link className="dropdown-item" to="/profile">
//                                                     <span className="DefaultFontColor">Your Profile</span>
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item" to="/bookings">
//                                                     <span className="DefaultFontColor">Your Bookings</span>
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item" to="/messages">
//                                                     <span className="DefaultFontColor">Messages</span>
//                                                 </Link>
//                                             </li>
//                                         </ul>
//                                     </li>

//                                     {/* About Dropdown */}
//                                     <li className="nav-item dropdown">
//                                         <a
//                                             className="nav-link dropdown-toggle"
//                                             href="#"
//                                             id="aboutDropdown"
//                                             role="button"
//                                             data-bs-toggle="dropdown"
//                                             aria-expanded="false"
//                                         >
//                                             <span className="DefaultFontColor">About</span>
//                                         </a>
//                                         <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
//                                             <li>
//                                                 <Link className="dropdown-item" to="/about-us">
//                                                     <span className="DefaultFontColor">About Us</span>
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item" to="/testimonials">
//                                                     <span className="DefaultFontColor">Testimonials</span>
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item" to="/faq">
//                                                     <span className="DefaultFontColor">FAQ</span>
//                                                 </Link>
//                                             </li>
//                                         </ul>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>

//                         <div className="col-md-4">
//                             <nav className="navbar navbar-light">
//                                 <form className="d-flex">
//                                     <input
//                                         className="form-control me-2"
//                                         type="search"
//                                         placeholder="Search"
//                                         aria-label="Search"
//                                     />
//                                     <button className="DefaultButton" type="submit">
//                                         <span className="DefaultFontColor">Search</span>
//                                     </button>
//                                 </form>
//                             </nav>
//                         </div>





//                         <div className="col-md-2">

//                             {/* Logo Section */}
//                             <a className="navbar-brand" href="/">
//                                 <img src="../assets/logo.png" alt="Logo" style={{ height: "40px" }} />
//                             </a>

//                         </div>



//                 </nav>
//             </div>

//         </header>
//     );
// };

// export default Header;



import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Offcanvas, Form, Button } from "react-bootstrap";
import "../App.css"

const Header: React.FC = () => {
    return (
        <header>
            {["sm"].map((expand) => (
                <Navbar key={expand} expand={expand} className="mb-3 DefaultBackground">
                    <Container fluid>
                        {/* Logo Section */}
                        <Navbar.Brand href="/">
                            <img src="/logo.png" alt="Logo" style={{ height: "40px" }} />
                        </Navbar.Brand>

                        {/* Offcanvas Toggle Button */}
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

                        {/* Offcanvas Section */}
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
                                {/* Navbar Links */}
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link as={Link} to="/">
                                        <span className="DefaultFontColor">Home</span>
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/services">
                                        <span className="DefaultFontColor">Services</span>                  </Nav.Link>

                                    {/* Profile Dropdown */}
                                    <NavDropdown title="Profile" id={`offcanvasNavbarDropdown-profile-${expand}`}>
                                        <NavDropdown.Item as={Link} to="/profile">
                                            <span className="DefaultFontColor">Your Profile</span>                    </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/bookings">
                                            <span className="DefaultFontColor">Your Bookings</span>                    </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/messages">
                                            <span className="DefaultFontColor">
                                                Messages</span>                    </NavDropdown.Item>
                                    </NavDropdown>

                                    {/* About Dropdown */}
                                    <NavDropdown title="About" id={`offcanvasNavbarDropdown-about-${expand}`}>
                                        <NavDropdown.Item as={Link} to="/about-us">
                                            <span className="DefaultFontColor">About Us</span>
                                        </NavDropdown.Item >
                                        <NavDropdown.Item as={Link} to="/testimonials">

                                            <span className="DefaultFontColor">Testimonials</span>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/faq">

                                            <span className="DefaultFontColor">FAQ</span>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>

                                {/* Search Bar */}
                                <Form className="d-flex mt-3 mt-lg-0 search-container">
  <div className="form-floating">
    <Form.Control
      type="search"
      placeholder="Search"
      className="me-2 DefaultInput no-focus"
      id="floatingInput"
      aria-label="Search"
    />
    <label htmlFor="floatingInput">Search</label>
  </div>
  <Button className="DefaultButton" type="submit">
    <span className="DefaultFontColor">
      <i className="fas fa-search"></i>
    </span>
  </Button>
</Form>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </header>
    );
};

export default Header;

