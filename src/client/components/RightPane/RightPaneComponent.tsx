import * as React from "react";

import TopBarComponent from "../RightPane/TopBarComponent";
import EntriesListContainer from "../../containers/RightPane/EntriesListContainer";

import * as Types from "../../types";

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
        this.setState({
            sortBy: data.value
        });
    };

    render() {
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
