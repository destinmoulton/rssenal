import PropTypes from "prop-types";
import React, { Component } from 'react';
import { connect } from "react-redux";

import { Dropdown } from "semantic-ui-react";

class SelectFeedGroup extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        selectedValue: PropTypes.string
    }

    constructor(props){
        super(props);

        this.state = {
            selectedValue: "0"
        }

        this._handleOnChange = this._handleOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.hasOwnProperty("selectedValue")){
            this.setState({
                selectedValue: nextProps.selectedValue
            });
        }
    }

    _handleOnChange(e, dropdown){
        
        const selectedValue = dropdown.value;
        this.setState({
            selectedValue
        });

        this.props.onChange(selectedValue);
    }

    render() {
        const { feedgroups } = this.props;
        const { selectedValue } = this.state;
        
        // Convert the feed groups Immutable list into
        // an array of key/value options.
        let groupOptions = feedgroups.map((group)=>{
            return {
                key: group._id,
                value: group._id,
                text: group.name
            };
        }).toArray();

        // Put "Uncategorized" first
        groupOptions.unshift(groupOptions.pop());
        
        return (
            <Dropdown 
                value={selectedValue}
                options={groupOptions}
                onChange={this._handleOnChange}
                selection
            />
        );
    }
}
const mapStateToProps = (state)=>{
    const { feedgroups } = state;
    return {
        feedgroups: feedgroups.groups
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectFeedGroup);