import * as React from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import EntriesList from "./Entries/EntriesList";
import LeftMenu from "./LeftMenu/LeftMenu";
import Messages from "./Messages";

import { IFilter } from "../interfaces";

interface IBrowserProps {}
interface IBrowserState {
    entriesFilter: IFilter;
}
class Browser extends React.Component {
    state: IBrowserState = {
        entriesFilter: { limit: "" }
    };

    constructor(props: IBrowserProps) {
        super(props);
        this._handleChangeEntriesFilter = this._handleChangeEntriesFilter.bind(
            this
        );
    }

    _handleChangeEntriesFilter(newFilter: IFilter) {
        this.setState({
            entriesFilter: newFilter
        });
    }

    render() {
        const { entriesFilter } = this.state;

        return (
            <div>
                <div className="rss-body-left-container">
                    <LeftMenu />
                </div>
                <div className="rss-body-right-container">
                    <EntriesList />
                </div>
                <Messages />
            </div>
        );
    }
}

export default Browser;
