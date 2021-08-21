import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import HomePage              from "./pages/HomePage"
import CadastroPage          from "./pages/CadastroPage"
import LoginPage             from "./pages/loginPage"
import cadastroUsuarioPage   from "./pages/cadastroUsuarioPage"
import AdminPage             from "./pages/AdminPage"

const Routes = ()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/portal/home" component={HomePage} />
            <Route exact path="/portal/cadastro" component={CadastroPage} />
            <Route exact path="/portal/login" component={LoginPage} />
            <Route exact path="/portal/admin" component={AdminPage} />
            <Route exact path="/portal/cadastroUsuario" component={cadastroUsuarioPage} />
            <Route path="*"> <Redirect to="/portal/login" /> </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;