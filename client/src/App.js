import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

export const App = () => {

  return (
    <>
      < Router >
        <Switch>
          <Layout>
            <Route exact path="/:comicId?" component={Home} />
          </Layout>
        </Switch >
      </ Router>
    </>
  )
}

export default App;
