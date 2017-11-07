import * as React from "react";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal } from "semantic-ui-react";
import SelectFolder from "./SelectFolder";

import { beginUpdateFeed } from "../../redux/actions/feeds.actions";

import {IDispatch, IFeed, IRootStoreState, TFolderID} from "../../interfaces";

interface IMapDispatchToProps {
    beginUpdateFeed: (feedInfo: any)=>void;
}

interface IMapStateToProps {
    isUpdatingFeed: boolean;
}

interface IEditFeedModalProps extends IMapDispatchToProps, IMapStateToProps{
    isModalOpen: boolean;
    onCloseModal: ()=>void;
    feed: any;
}

interface IEditFeedModalState {
    newFeed: any;
}

class EditFeedModal extends React.Component<IEditFeedModalProps> {

    state: IEditFeedModalState = {
        newFeed: {title:""}
    }

    constructor(props: IEditFeedModalProps){
        super(props);
        
        this._handleClose = this._handleClose.bind(this);
        this._handleSave = this._handleSave.bind(this);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleInputOnChange = this._handleInputOnChange.bind(this);
        this._handleSelectFolderChange = this._handleSelectFolderChange.bind(this);
    }

    componentWillReceiveProps(nextProps: IEditFeedModalProps){
        if(this.props.isUpdatingFeed && !nextProps.isUpdatingFeed){
            this._handleClose();
        }

        this.setState({
            newFeed: nextProps.feed
        });
    }
    
    _handleClose(){
        this.setState({
            newFeed: {}
        });

        this.props.onCloseModal();
    }

    _handleSave(){
        const { newFeed } = this.state;

        if(newFeed.name !== ""){
            this.props.beginUpdateFeed(newFeed);
        }
    }

    _handleInputKeyPress(e: any){
        if(e.key === "Enter"){
            this._handleSave();
        }
    }

    _handleInputOnChange(e: React.FormEvent<HTMLInputElement>){
        const { newFeed } = this.state;
        newFeed.title = e.currentTarget.value;
        this.setState({
            newFeed
        });
    }

    _handleSelectFolderChange(folderId: TFolderID){
        const { newFeed } = this.state;
        newFeed.folder_id = folderId;
        
        this.setState({
            newFeed
        });
    }

    _buildEditInput(){
        const { newFeed } = this.state;
        const { isUpdatingFeed } = this.props;
        
        return (
            <div>
                <label>Feed Name</label>
                <input
                    autoFocus
                    value={newFeed.title}
                    placeholder="Feed name..."
                    onKeyPress={this._handleInputKeyPress}
                    onChange={this._handleInputOnChange}
                    disabled={isUpdatingFeed}
                    className="rss-editfeed-input"
                />
                <br/><br/>
                <label>Folder</label><br/>
                <SelectFolder
                    selectedValue={newFeed.folder_id} 
                    onChange={this._handleSelectFolderChange}/>
            </div>
        )
    }

    _buildButtons(){
        const { isUpdatingFeed } = this.props;

        let cancelButton = null;
        if(!isUpdatingFeed){
            cancelButton = <Button
                                color="orange"
                                content="Cancel"
                                floated="left"
                                icon="cancel"
                                inverted
                                onClick={this._handleClose}
                            />;
        }

        return (
            <div>
                {cancelButton}
                <Button 
                    color="green"
                    content="Save"
                    icon="save"
                    inverted
                    loading={isUpdatingFeed}
                    onClick={this._handleSave}
                />
            </div>
        );
    }

    render() {
        const { isModalOpen } = this.props;
        const form = this._buildEditInput();

        const buttons = this._buildButtons();
        return (
            <span>
                <Modal
                    open={isModalOpen}
                    onClose={this._handleClose}
                    size="tiny"
                >
                    <Header icon="pencil" content="Edit Feed" />
                    <Modal.Content>
                        {form}
                    </Modal.Content>
                    <Modal.Actions>
                        {buttons}
                    </Modal.Actions>
                </Modal>
            </span>
        );
    }
}
const mapStateToProps = (state: IRootStoreState): IMapStateToProps=>{
    const { feeds } = state;
    return {
        isUpdatingFeed: feeds.isUpdatingFeed
    };
}

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchToProps=>{
    return {
        beginUpdateFeed: (feedInfo)=> dispatch(beginUpdateFeed(feedInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFeedModal);