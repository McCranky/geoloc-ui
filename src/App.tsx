import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Properties from "./components/properties/Properties";
import Plots from "./components/plots/Plots";
import GeoLoc from "./components/GeoLoc";
import ObjectsFinder from "./components/ObjectsFinder";

function App() {
    return (
        <>
            <NavBar />
            <div className='App'>
                <Switch>
                    <Route path='/' exact component={GeoLoc} />
                    <Route path='/objectsFinder' component={ObjectsFinder} />
                    <Route path='/properties' component={Properties} />
                    <Route path='/plots' component={Plots} />
                    <Redirect to='/' />
                </Switch>
            </div>
        </>
    );
}

export default App;
