import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import DetailPage from './pages/DetailPage/DetailPage';

export default (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/detail-page/add' component={DetailPage} />
    <Route path='/detail-page/edit/:id' component={DetailPage} />
  </Switch>
);