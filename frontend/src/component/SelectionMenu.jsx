import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown, Navbar } from 'react-bootstrap'
import { handleLogin, handleLogout } from '../services/login'
import { useNavigate } from 'react-router-dom'

const SelectionMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (window.localStorage.getItem('loggedInUser')) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <>
      <NavBar
        fixed='sticky top'
        expand='md'
        data-bs-theme='dark'
        className='main-navbar'>
        <Container>
          <NavBar.Brand
            className='brand'
            onClick={() => navigate('/')}>
            Spotify Blindtest
          </NavBar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <NavBar.Collapse
            id='basic-navbar-nav'
            className='justify-content-between'>
            <Nav>
              {isLoggedIn && (
                <>
                  <Nav.Link href='/playlists/user'>Collection</Nav.Link>
                  <Nav.Link href='/playlists/featured'>Featured</Nav.Link>
                  <NavDropdown
                    title='Categories'
                    id='basic-nav-dropdown'>
                    <NavDropdown.Item href='/playlists/classical'>
                      Classical
                    </NavDropdown.Item>
                    <NavDropdown.Item href='/playlists/rock'>
                      Rock
                    </NavDropdown.Item>
                    <NavDropdown.Item href='/playlists/decades'>
                      Décennies
                    </NavDropdown.Item>
                    <NavDropdown.Item href='/playlists/jazz'>
                      Jazz
                    </NavDropdown.Item>
                    <NavDropdown.Item href='/playlists/punk'>
                      Punk
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
            <Nav className='justify-content-end'>
              {isLoggedIn ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
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
