import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import {UserContextProvider} from './usercontext'

axios.defaults.baseURL = 'http://127.0.1:8080';
axios.defaults.withCredentials = true;


function App() {
 
  return (
    <UserContextProvider> 
      <Router>
      <Routes>
        <Route path='/' element={< Layout />}> 
        <Route index element={< IndexPage />} />
        <Route path='/login' element={< LoginPage />} />
          <Route path='/register' element={ < RegisterPage /> } />
        </Route>
      </Routes>
      </Router>
    </UserContextProvider>

  )
}

export default App
