import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Main from '../../../pages/Main';

const AppRouter = ({ isFetching }) => (
  <Router>
    <div className="appContent">
        <Route exact path="/" render={({ ...props }) => <Main {...props} />} />
    </div>
  </Router>
);

export default AppRouter;
