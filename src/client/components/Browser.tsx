import * as React from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import EntriesList from "./Entries/EntriesList";
import LeftMenu from "./LeftMenu/LeftMenu";
import MessagesContainer from "../containers/MessagesContainer";

const Browser: React.SFC = () => {
    return (
        <div>
            <div className="rss-body-left-container">
                <LeftMenu />
            </div>
            <div className="rss-body-right-container">
                <EntriesList />
            </div>
            <MessagesContainer />
        </div>
    );
};

export default Browser;
