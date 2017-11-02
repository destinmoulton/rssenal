import * as React from 'react';
import { connect } from "react-redux";

import { Dropdown } from "semantic-ui-react";

import { IRootStoreState, TFolders, TFolderID } from "../../interfaces";
interface IMapStateToProps{
    folders: TFolders
}

interface ISelectFolderProps extends IMapStateToProps{
    onChange: (feedGroupId: TFolderID)=>void;
    selectedValue?: string;
}

class SelectFolder extends React.Component<ISelectFolderProps> {

    static defaultProps = {
        selectedValue: "0"
    }

    state = {
        selectedValue: this.props.selectedValue
    }

    constructor(props: ISelectFolderProps){
        super(props);

        this._handleOnChange = this._handleOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps: ISelectFolderProps){
        if(nextProps.hasOwnProperty("selectedValue")){
            this.setState({
                selectedValue: nextProps.selectedValue
            });
        }
    }

    _handleOnChange(e: any, dropdown: any){
        
        const selectedValue = dropdown.value;
        this.setState({
            selectedValue
        });

        this.props.onChange(selectedValue);
    }

    render() {
        const { folders } = this.props;
        const { selectedValue } = this.state;
        
        // Convert the feed folders Immutable list into
        // an array of key/value options.
        let groupOptions = folders.map((folder)=>{
            return {
                key: folder._id,
                value: folder._id,
                text: folder.name
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
    const { folders } = state;
    return {
        folders: folders.folders
    }
}

export default connect(mapStateToProps)(SelectFolder);