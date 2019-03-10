import React, { Component } from 'react';
import './App.css';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from '../components/ErrorPage/NotFound';
import User from '../components/UserComponent/Users';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users" component={User} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
