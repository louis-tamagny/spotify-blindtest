import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown, Navbar } from 'react-bootstrap'
import { handleLogin, handleLogout } from '../services/login'

const SelectionMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem('loggedInUser')) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <>
      <NavBar expand="md" bg="dark" data-bs-theme="dark">
        <Container>
          <NavBar.Brand>Spotify Blindtest</NavBar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <NavBar.Collapse id="basic-navbar-nav">
            <Nav>
              {isLoggedIn ? (
                <>
                  <Nav.Link href="/playlists/user">Collection</Nav.Link>
                  <Nav.Link href="/playlists/featured">Featured</Nav.Link>
                  <NavDropdown title="Categories" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/playlists/classical">
                      Classical
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={handleLogin}>Login</Nav.Link>
              )}
            </Nav>
          </NavBar.Collapse>
        </Container>
      </NavBar>
    </>
  )
}

export default SelectionMenu
