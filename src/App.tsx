import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Properties from "./components/Properties";
import Plots from "./components/Plots";

function App() {
    return (
        <>
            <NavBar />
            <div className='App'>
                <Switch>
                    <Route path='/plots' exact component={Plots} />
                    <Route path='/properties' component={Properties} />
                    <Redirect to='/plots' />
                </Switch>
            </div>
        </>
    );
}

export default App;
