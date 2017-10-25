import React, { Component } from "react";
import { connect } from "react-redux";
import { sortable } from "react-sortable";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

import ReorderGroupItem from "./ReorderGroupItem";

const SortableItem = sortable(ReorderGroupItem);


class ReorderGroupsModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            draggingIndex: null,
            groupsAsArray: [],
            isModalOpen: false
        }

        this._handleCloseModal = this._handleCloseModal.bind(this);
        this._handleOpenModal = this._handleOpenModal.bind(this);
        this._reorderComplete = this._reorderComplete.bind(this);
    }

    componentWillReceiveProps(nextProps){
        let tmpArray = nextProps.groups.toArray().sort(this._sortItems);
        //Remove the "Uncategorized" group
        tmpArray.pop();

        const groupsAsArray = tmpArray.map((group)=>group.name);
        this.setState({
            groupsAsArray
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

    _sortItems(a, b){
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        if (a.order === b.order) return 0;
    }

    _reorderComplete(reorderedObj){
        console.log(reorderedObj);
        if(reorderedObj.hasOwnProperty("draggingIndex")){
            this.setState({
                draggingIndex: reorderedObj.draggingIndex
            })
        }
        if(reorderedObj.hasOwnProperty("items")){
            this.setState({
                groupsAsArray: reorderedObj.items
            });
        }
        
    }

    _buildReorderer(){
        const { draggingIndex, groupsAsArray } = this.state;
        console.log(groupsAsArray);
        const reorderItems = groupsAsArray.map((group, index)=>{
                return (
                    <SortableItem
                        key={index}
                        updateState={this._reorderComplete}
                        items={groupsAsArray}
                        draggingIndex={draggingIndex}
                        outline="list"
                        sortId={index}
                    >{group}</SortableItem>
                );
        });

        return (<div>{reorderItems}</div>);
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