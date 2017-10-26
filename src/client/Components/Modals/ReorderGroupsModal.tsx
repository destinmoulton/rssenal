import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

import { SortableGroupItem, SortableGroupList } from "./SortableComponents";

import { compareAscByProp } from "../../lib/sort";

class ReorderGroupsModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            groupsAsArray: [],
            isModalOpen: false
        }

        this._handleCloseModal = this._handleCloseModal.bind(this);
        this._handleOpenModal = this._handleOpenModal.bind(this);
        this._reorderComplete = this._reorderComplete.bind(this);
    }

    componentWillReceiveProps(nextProps){
        let tmpArray = nextProps.groups.toArray().sort((a, b)=>compareAscByProp(a,b,"order"));
        //Remove the "Uncategorized" group
        tmpArray.pop();

        this.setState({
            groupsAsArray: tmpArray
        });
    }

    _handleCloseModal(){
        this.setState({
            isModalOpen: false
        });
    }

    _handleOpenModal(){
        this.setState({
            isModalOpen: true
        });
    }

    _reorderComplete(reorderedObj){
        this.setState({
            groupsAsArray: arrayMove(this.state.groupsAsArray, reorderedObj.oldIndex, reorderedObj.newIndex)
        });
    }

    _buildReorderer(){
        const { groupsAsArray } = this.state;
        
        return (
            <SortableGroupList items={groupsAsArray} onSortEnd={this._reorderComplete}/>
        );
    }

    render() {
        const { isModalOpen } = this.state;
        const reorderer = this._buildReorderer();
        return (
            <span>
                <Button
                    icon="numbered list"
                    onClick={this._handleOpenModal}
                />
                <Modal
                    open={isModalOpen}
                    onClose={this._handleCloseModal}
                    size="tiny"
                >
                    <Header icon="numbered list" content="Reorder Groups" />
                    <Modal.Content>
                        {reorderer}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            icon="checkmark"
                            onClick={this._handleCloseModal}
                        />
                    </Modal.Actions>
                </Modal>
            </span>
        );
    }
}

const mapStateToProps = (state)=>{
    const { feedgroups } = state;
    return {
        groups: feedgroups.groups
    }
};

const mapDispatchToProps = (state)=>{
    return {

    }
};
export default connect(mapStateToProps)(ReorderGroupsModal);