import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Properties from "./components/properties/Properties";
import Plots from "./components/plots/Plots";
import GeoLoc from "./components/GeoLoc";

function App() {
    return (
        <>
            <NavBar />
            <div className='App'>
                <Switch>
                    <Route path='/' exact component={GeoLoc} />
                    <Route path='/plots' component={Plots} />
                    <Route path='/properties' component={Properties} />
                    <Redirect to='/' />
                </Switch>
            </div>
        </>
    );
}

export default App;
