import SelectionMenu from './component/SelectionMenu'
import GameView from './component/GameView'
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import CallbackPopup from './component/CallbackPopup'

function App() {
  return (
    <div className="container">
      <SelectionMenu />
      <Routes>
        <Route path="/callback" element={<CallbackPopup />} />
        <Route path="/game" element={<GameView />} />
      </Routes>
    </div>
  )
}

export default App
