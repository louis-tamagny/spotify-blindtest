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
      className='main-container'
      fluid
      style={{ padding: '0px' }}>
      <div>
        <SelectionMenu />
        <Notification />
      </div>
      <div className='content'>
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
      </div>
      <div className='footer'>
        <div className='left'>2024 - Created by Louis Tamagny</div>
        <div className='right'>About</div>
      </div>
    </Container>
  )
}

export default App
