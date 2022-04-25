import React from 'react';
import {Navbar,Container,Nav} from 'react-bootstrap';
const Header = () => {
  return (
    <Navbar  bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Email Guesser</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Guess Email</Nav.Link>
          <Nav.Link href="/upload">Upload Format</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default Header;
