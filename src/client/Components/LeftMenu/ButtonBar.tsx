import * as React from "react";
import { connect } from "react-redux";

import { Button, Icon } from "semantic-ui-react";

import LogoutButton from "../LogoutButton";
import ReorderFoldersModal from "../Modals/ReorderFoldersModal";
import { refreshAllFeeds } from "../../redux/actions/feeds.actions";
import * as Types from "../../interfaces";

interface IMapDispatchProps {
    refreshAllFeeds: () => void;
}

interface IButtonBarProps extends IMapDispatchProps {
    openAddFeedModal: (newFeed: object) => void;
    openEditFolderModal: (folderDefault: object) => void;
}

class ButtonBar extends React.Component<IButtonBarProps> {
    constructor(props: IButtonBarProps) {
        super(props);

        this._handleClickRefresh = this._handleClickRefresh.bind(this);
    }

    _handleAddFolder() {
        this.props.openEditFolderModal({ _id: "", name: "" });
    }

    _handleAddFeed() {
        this.props.openAddFeedModal({ _id: "", title: "" });
    }

    _handleClickRefresh() {
        this.props.refreshAllFeeds();
    }

    render() {
        return (
            <div className="rss-leftmenu-buttonbar-container">
                <Button.Group size="tiny">
                    <Button
                        color="grey"
                        onClick={this._handleAddFeed.bind(this)}
                    >
                        <Icon name="plus" />
                        <Icon name="rss" />
                    </Button>
                    <Button
                        color="olive"
                        onClick={this._handleAddFolder.bind(this)}
                    >
                        <Icon name="plus" />
                        <Icon name="folder" />
                    </Button>
                </Button.Group>&nbsp;
                <ReorderFoldersModal />
                <Button
                    icon="refresh"
                    onClick={this._handleClickRefresh}
                    size="tiny"
                />
                <LogoutButton />
            </div>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState) => {
    return {};
};

const mapDispatchToProps = (dispatch: Types.IDispatch): IMapDispatchProps => {
    return {
        refreshAllFeeds: () => dispatch(refreshAllFeeds())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar);
