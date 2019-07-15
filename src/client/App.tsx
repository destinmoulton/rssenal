import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./redux/store";

import WindowContainer from "./containers/WindowContainer";

class App {
    run() {
        const container = document.getElementById("react-app");

        const routing = (
            <Provider store={store}>
                <BrowserRouter>
                    <WindowContainer />
                </BrowserRouter>
            </Provider>
        );

        render(routing, container);
    }
}

const app = new App();
app.run();
