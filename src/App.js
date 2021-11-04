import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

export const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Layout>
            <Route exact path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
          </Layout>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App