import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import { beginDeleteFeed } from "../../redux/actions/feeds.actions";
import { changeFilter } from "../../redux/actions/filter.actions";

class FeedItem extends Component {
    static propTypes = {
        editFeed: PropTypes.func.isRequired,
        feed: PropTypes.object.isRequired
    };
    constructor(props){
        super(props);

        this.state = {
            isOptionsVisible: false
        }

        this._handleClickDelete = this._handleClickDelete.bind(this);
        this._handleClickEdit = this._handleClickEdit.bind(this);
        this._handleClickTitle = this._handleClickTitle.bind(this);
        this._handleHideOptions = this._handleHideOptions.bind(this);
        this._handleShowOptions = this._handleShowOptions.bind(this);
    }

    _handleShowOptions(){
        this.setState({
            isOptionsVisible: true
        });
    }

    _handleHideOptions(){
        this.setState({
            isOptionsVisible: false
        })
    }

    _handleClickDelete(){
        const { beginDeleteFeed, feed } = this.props;
        const conf = confirm(`Are you sure you want to delete "${feed.title}"?`);
        if(conf){
            beginDeleteFeed(feed._id);
        }
    }

    _handleClickEdit(){
        this.props.editFeed(this.props.feed);
    }

    _handleClickTitle(){
        const { changeFilter, feed } = this.props;

        changeFilter({
            limit: "feed",
            id: feed._id
        });
    }

    _buildOptions(){
        return (
            <span>
                <Icon 
                    name="pencil"
                    color="green" 
                    onClick={this._handleClickEdit}
                />
                <Icon  
                    name="trash"
                    color="red"
                    onClick={this._handleClickDelete}
                />
            </span>
        );
    }

    render() {
        const { feed, filter } = this.props;
        const { isOptionsVisible } = this.state;

        let className = "";
        if(filter.limit === "feed" && filter.id === feed._id){
            className = "rss-feedgroups-feeditem-title-active"
        }
        let title = <span onClick={this._handleClickTitle} className={className}>{feed.title}</span>;

        let options = "";
        if(isOptionsVisible){
            options = this._buildOptions();
        }

        return (
            <div className="rss-feedgroups-feeditem"
                 onMouseEnter={this._handleShowOptions}
                 onMouseLeave={this._handleHideOptions}>{title}&nbsp;{options}</div>
        );
    }
}
const mapStateToProps = (state)=>{
    const { filter } = state;
    return {
        filter: filter.filter
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        beginDeleteFeed: (feedId)=>dispatch(beginDeleteFeed(feedId)),
        changeFilter: (newFilter)=>dispatch(changeFilter(newFilter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);