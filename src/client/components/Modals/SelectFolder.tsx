import * as React from "react";

import { Dropdown } from "semantic-ui-react";

import { TFolders, TFolderID } from "../../types";

interface ISelectFolderProps {
    onChange: (folderId: TFolderID) => void;
    selectedValue: string;
    folders: TFolders;
}

class SelectFolder extends React.Component<ISelectFolderProps> {
    _handleOnChange = (e: any, dropdown: any) => {
        const selectedValue = dropdown.value;

        this.props.onChange(selectedValue);
    };

    render() {
        const { folders, selectedValue } = this.props;

        // Convert the feed folders Immutable list into
        // an array of key/value options.
        let folderOptions = folders
            .map(folder => {
                return {
                    key: folder._id,
                    value: folder._id,
                    text: folder.name
                };
            })
            .toArray();

        // Put "Uncategorized" first
        folderOptions.unshift(folderOptions.pop());

        return (
            <Dropdown
                value={selectedValue}
                options={folderOptions}
                onChange={this._handleOnChange}
                selection
            />
        );
    }
}

export default SelectFolder;
