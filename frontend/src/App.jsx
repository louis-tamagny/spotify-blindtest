import SelectionMenu from './component/SelectionMenu'
import GameView from './component/GameView'
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import CallbackPopup from './component/CallbackPopup'
import { Container } from 'react-bootstrap'
import PlaylistList from './component/PlaylistList'
import Notification from './component/Notification'

function App() {
  return (
    <Container
      fluid
      style={{ padding: '0px' }}>
      <SelectionMenu />
      <Notification />
      <Routes>
        <Route
          path='/callback'
          element={<CallbackPopup />}
        />
        <Route
          path='/playlists/:playlistParam'
          element={<PlaylistList />}
        />
        <Route
          path='/game'
          element={<GameView />}
        />
      </Routes>
    </Container>
  )
}

export default App
