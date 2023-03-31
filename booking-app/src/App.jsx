import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';


function App() {
 
  return (
<Router>
      <Routes>
        <Route path='/' element={< Layout />}> 
        <Route index element={< IndexPage />} />
        <Route path='/login' element={< LoginPage />} />
          <Route path='/register' element={ < RegisterPage /> } />
        </Route>
   </Routes>
</Router>
  )
}

export default App
