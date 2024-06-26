import React from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {
  return (
    <Provider store={store}>
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
      </Provider>
      )
}

export default App