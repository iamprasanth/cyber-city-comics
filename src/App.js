import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


export const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App