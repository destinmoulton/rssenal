import * as React from "react";

import EntriesListContainer from "../containers/RightPane/EntriesListContainer";
import LeftPaneContainer from "../containers/LeftPane/LeftPaneContainer";
import MessagesContainer from "../containers/MessagesContainer";

const Browser: React.SFC = () => {
    return (
        <div>
            <div className="rss-body-left-container">
                <LeftPaneContainer />
            </div>
            <div className="rss-body-right-container">
                <EntriesListContainer />
            </div>
            <MessagesContainer />
        </div>
    );
};

export default Browser;
