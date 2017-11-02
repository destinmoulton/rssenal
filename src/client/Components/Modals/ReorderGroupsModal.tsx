import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

import { SortableGroupItem, SortableGroupList } from "./SortableComponents";

import { beginReorderFeedGroups } from "../../redux/actions/feedgroups.actions";
import { compareAscByProp } from "../../lib/sort";

import { IDispatch, IFeedgroup, IRootStoreState, TFeedgroups } from "../../interfaces";

interface IMapStateToProps {
    groups: TFeedgroups
}

interface IMapDispatchToProps {
    beginReorderFeedGroups: (feedgroupsArr: IFeedgroup[])=>void
}

interface IReorderGroupsModalProps extends IMapStateToProps, IMapDispatchToProps{

}

interface IReorderGroupsModalState {
    groupsAsArray: IFeedgroup[];
    isModalOpen: boolean;
}

class ReorderGroupsModal extends React.Component<IReorderGroupsModalProps> {

    state: IReorderGroupsModalState = {
        groupsAsArray: [],
        isModalOpen: false
    }

    constructor(props: IReorderGroupsModalProps){
        super(props);

        this._handleCloseModal = this._handleCloseModal.bind(this);
        this._handleOpenModal = this._handleOpenModal.bind(this);
        this._handlePressOK = this._handlePressOK.bind(this);
        this._onSortEnd = this._onSortEnd.bind(this);
    }

    componentWillReceiveProps(nextProps: IReorderGroupsModalProps){
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

    _handlePressOK(){
        const { groupsAsArray } = this.state;
        const orderedGroups = groupsAsArray.map((feedgroup, index)=>{
            feedgroup.order = index + 1;
            return feedgroup;
        });
        this.props.beginReorderFeedGroups(groupsAsArray);
        this._handleCloseModal();
    }

    _onSortEnd(reorderedObj: any){
        const newGroupsArray = this._reorderGroupsArray(reorderedObj.oldIndex, reorderedObj.newIndex);
        this.setState({
            groupsAsArray: newGroupsArray
        });
    }
    
    _reorderGroupsArray(previousIndex: number, newIndex: number):IFeedgroup[] {
        const array = this.state.groupsAsArray.slice(0);
        if (newIndex >= array.length) {
            let k = newIndex - array.length;
            while (k-- + 1) {
                array.push(undefined);
            }
        }
        array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
        return array;
    }

    render() {
        const { groupsAsArray, isModalOpen } = this.state;
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
                        <SortableGroupList items={groupsAsArray} onSortEnd={this._onSortEnd}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            icon="cancel"
                            inverted
                            onClick={this._handleCloseModal}
                        />
                        <Button
                            icon="checkmark"
                            color="green"
                            inverted
                            onClick={this._handlePressOK}
                        />
                    </Modal.Actions>
                </Modal>
            </span>
        );
    }
}

const mapStateToProps = (state: IRootStoreState): IMapStateToProps =>{
    const { feedgroups } = state;
    return {
        groups: feedgroups.groups
    }
};

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchToProps =>{
    return {
        beginReorderFeedGroups: (feedgroupsArr)=>dispatch(beginReorderFeedGroups(feedgroupsArr))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReorderGroupsModal);