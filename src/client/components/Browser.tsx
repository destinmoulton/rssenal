import * as React from "react";

import LeftPaneContainer from "../containers/LeftPane/LeftPaneContainer";
import MessagesContainer from "../containers/MessagesContainer";
import RightPaneContainer from "../containers/RightPane/RightPaneContainer";

const Browser: React.SFC = () => {
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
