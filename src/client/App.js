import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store";

import RSSEnal from "./Components/RSSEnal";

class App {
    run(){
        const container = document.getElementById("react-app");

        const routing = (
            <Provider store={store}>
                <BrowserRouter>
                    <RSSEnal />
                </BrowserRouter>
            </Provider>
        );

        render(routing, container);
    }
}

const app = new App();
app.run();