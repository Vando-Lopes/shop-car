import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../pages/main/main';
import Ofertas from "../pages/ofertas/ofertas"
import Admin from "../pages/admin/admin"

const Routes = () => (
  <Switch>
      <Route path='/' exact component={Ofertas} />
      <Route path='/ofertas' exact component={Ofertas}/>
      <Route path='/admin' exact component={Admin}/>
  </Switch>
);

export default Routes;