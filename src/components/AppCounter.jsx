import React from 'react';

import { DrizzleContext } from "drizzle-react";

import AppHeader from './AppHeader';
import AppData from './AppData';
import AppControl from './AppControl';

class AppCounter extends React.Component {

    render() {
      return (
        <DrizzleContext.Consumer>
          {drizzleContext => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) return "Cargando...";

            return (
              <div className="appCounter">
                <AppHeader />
                <AppData drizzle={drizzle} drizzleState={drizzleState} />
                <AppControl drizzle={drizzle} drizzleState={drizzleState} />
              </div>
            );
          }}
        </DrizzleContext.Consumer>
      );
    }
}

export default AppCounter;

