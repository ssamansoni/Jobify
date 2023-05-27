import { BrowserRouter, Routes, Route} from 'react-router-dom'
import {Register , Error , Landing , ProtectedRoute} from "./pages";
import {AddJob , AllJobs , Stats , Profile , SharedLayout} from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
        <ProtectedRoute>
          <SharedLayout/>
        </ProtectedRoute>
        }>
          <Route index element={<Stats/>}/>
          <Route path='addjob' element={<AddJob/>}/>
          <Route path='alljobs' element={<AllJobs/>}/>
          <Route path='profile' element={<Profile/>}/>
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/landing' element={<Landing/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
