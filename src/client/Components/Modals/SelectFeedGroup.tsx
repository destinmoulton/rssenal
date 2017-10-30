import * as React from 'react';
import { connect } from "react-redux";

import { Dropdown } from "semantic-ui-react";

import { IRootStoreState, TFeedgroups } from "../../interfaces";
interface IMapStateToProps{
    feedgroups: TFeedgroups
}

interface ISelectFeedGroupProps extends IMapStateToProps{
    onChange: (selectedValue: string)=>void;
    selectedValue: string
}

class SelectFeedGroup extends React.Component<ISelectFeedGroupProps> {

    static defaultProps = {
        selectedValue: "0"
    }

    state = {
        selectedValue: this.props.selectedValue
    }

    constructor(props: ISelectFeedGroupProps){
        super(props);

        this._handleOnChange = this._handleOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps: ISelectFeedGroupProps){
        if(nextProps.hasOwnProperty("selectedValue")){
            this.setState({
                selectedValue: nextProps.selectedValue
            });
        }
    }

    _handleOnChange(e: React.FormEvent<HTMLSelectElement>, dropdown: any){
        
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
const mapStateToProps = (state: IRootStoreState)=>{
    const { feedgroups } = state;
    return {
        feedgroups: feedgroups.groups
    }
}

export default connect(mapStateToProps)(SelectFeedGroup);