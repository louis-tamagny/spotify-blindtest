import PlaylistList from "./PlaylistList"
import { useState } from "react"
import spotifyService from "../services/spotify"
import GameView from "./GameView"
import Container from "react-bootstrap/Container"
import NavBar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { NavDropdown, Navbar } from "react-bootstrap"

const SelectionMenu = () => {
  const [playlists, setPlaylists] = useState([])

  const getUserPlaylists = async () => {
    const newPlaylists = await spotifyService.getUserPlaylists()
    setPlaylists(newPlaylists)
  }

  const getFeaturedPlaylists = async () => {
    const newPlaylists = await spotifyService.getFeaturedPlaylists()
    setPlaylists(newPlaylists)
  }

  const getCategoryPlaylists = async (category) => {
    const newPlaylists = await spotifyService.getPlaylistsByCategory(category)
    setPlaylists(newPlaylists)
  }

  return (
    <Container>
      <NavBar expand="md" bg="dark" data-bs-theme="dark">
        <Container>
          <NavBar.Brand>Spotify Blindtest</NavBar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <NavBar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link onClick={() => getUserPlaylists()}>Collection</Nav.Link>
              <Nav.Link onClick={() => getFeaturedPlaylists()}>
                Featured
              </Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => getCategoryPlaylists("classical")}
                >
                  Classical
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </NavBar.Collapse>
        </Container>
      </NavBar>
      <PlaylistList playlists={playlists} />
      <GameView />
    </Container>
  )
}

export default SelectionMenu
