import './App.css'
import Form from './components/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Table from './components/Table'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/form' element={<Form />} />
        <Route path='/:id' element={<Form />} />
        <Route path='/show' element={<Table />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
