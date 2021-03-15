import './stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SellOrders from './components/sellOrders';
import Create from './components/create';
import Show from './components/show';
import Broken from './components/broken';
import NoMatch from './components/noMatch';
import React, {Component} from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route exact path='/'>
             <SellOrders /> 
            </Route>
            <Route exact path='/new'>
              <Create />
            </Route>
            <Route path='/show/:id'>
              <Show />
            </Route>
            <Route path="/broken">
              <Broken />
            </Route>
            <Route exact path='*'>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </HashRouter>  
    );
  }
}


export default App;