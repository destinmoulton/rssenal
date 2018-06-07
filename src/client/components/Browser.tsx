import * as React from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import EntriesListContainer from "../containers/Entries/EntriesListContainer";
import LeftMenuContainer from "../containers/LeftMenu/LeftMenuContainer";
import MessagesContainer from "../containers/MessagesContainer";

const Browser: React.SFC = () => {
    return (
        <div>
            <div className="rss-body-left-container">
                <LeftMenuContainer />
            </div>
            <div className="rss-body-right-container">
                <EntriesListContainer />
            </div>
            <MessagesContainer />
        </div>
    );
};

export default Browser;
