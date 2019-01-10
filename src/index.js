
import React from 'react';
import ReactDOM from 'react-dom';

import "./css/style.css";

import drizzle from "./drizzle";

import { DrizzleContext } from "drizzle-react";

import AppCounter from './components/AppCounter';

ReactDOM.render(
    <DrizzleContext.Provider drizzle={drizzle}>
        <AppCounter />
    </DrizzleContext.Provider>,
    document.getElementById('root')
);
