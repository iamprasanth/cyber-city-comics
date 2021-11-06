import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Layout from './components/Layout';
import './App.css';

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
