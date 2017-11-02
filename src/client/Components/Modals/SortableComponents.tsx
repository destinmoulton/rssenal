import * as React from 'react';
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { IFolder } from "../../interfaces";

interface ISortableGroupItemProps {
    value: any;
};
export const SortableGroupItem = SortableElement((props: ISortableGroupItemProps)=>{
    const { value } = props;
    return <div className="rss-sortgroup-list-item">{value}</div>;
});

interface ISortableGroupListProps {
    items: IFolder[];
    onSortEnd: any;
};
export const SortableGroupList = SortableContainer((props: ISortableGroupListProps)=>{
    const {items} = props;
    const itemsList = items.map((value: IFolder, index: number)=>{
        return (
            <div className="rss-sortgroup-list-container" key={`item-${index}`}>
                <SortableGroupItem key={`item-${index}`} index={index} value={value.name}/>
            </div>
        );
    });
    return <ul>{itemsList}</ul>;
});