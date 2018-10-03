import debug from "debug";
import * as React from "react";

import LeftPaneContainer from "../containers/LeftPane/LeftPaneContainer";
import MessagesContainer from "../containers/MessagesContainer";
import RightPaneContainer from "../containers/RightPane/RightPaneContainer";

const log = debug("rssenal:Browser");

const Browser: React.SFC = () => {
    log("Browser()");
    return (
        <div>
            <div className="rss-body-left-container">
                <LeftPaneContainer />
            </div>
            <div className="rss-body-right-container">
                <RightPaneContainer />
            </div>
            <MessagesContainer />
        </div>
    );
};

export default Browser;
