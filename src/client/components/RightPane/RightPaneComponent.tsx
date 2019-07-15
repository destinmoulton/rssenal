import debug from "debug";
import * as React from "react";

import TopBarComponent from "../RightPane/TopBarComponent";
import EntriesListContainer from "../../containers/RightPane/EntriesListContainer";

const log = debug("rssenal:RightPaneComponent");

export interface IRightPaneMapState {
    filterTitle: string;
}

export interface IRightPaneMapDispatch {}

type TAll = IRightPaneMapDispatch & IRightPaneMapState;

interface IState {
    sortBy: string;
}

class RightPaneComponent extends React.Component<TAll, IState> {
    state = {
        sortBy: "publish_date:asc"
    };

    _handleChangeSort = (e: any, data: any) => {
        log("_handleChangeSort()");
        this.setState({
            sortBy: data.value
        });
    };

    render() {
        log("render()");
        const { filterTitle } = this.props;
        const { sortBy } = this.state;
        return (
            <div>
                <TopBarComponent
                    title={filterTitle}
                    onChangeSort={this._handleChangeSort}
                    sortBy={sortBy}
                />
                <EntriesListContainer sortBy={sortBy} />
            </div>
        );
    }
}

export default RightPaneComponent;
