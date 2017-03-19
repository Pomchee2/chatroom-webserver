import React from 'react';
import ReactDOM from 'react-dom';

import App from '~/src/comp/App.jsx';
import ChooseName from '~/src/comp/ChooseName.jsx';
import Empty from '~/src/comp/Empty.jsx';


import {Router, Route, IndexRedirect, hashHistory} from "react-router";

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Empty}>
      <Route path="/choose-name" component={ChooseName} />
      <Route path="/chat/:username" component={App} />
      <IndexRedirect to="/choose-name"/>
    </Route>
  </Router>
), document.getElementById('app-content'));

