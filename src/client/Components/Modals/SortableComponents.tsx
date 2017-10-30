import * as React from 'react';
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { IFeedgroup } from "../../interfaces";

export const SortableGroupItem = SortableElement(({value})=>{
    return <div className="rss-sortgroup-list-item">{value}</div>;
});

export const SortableGroupList = SortableContainer(({items})=>{
    const itemsList = items.map((value: IFeedgroup, index: number)=>{
        return (
            <div className="rss-sortgroup-list-container" key={`item-${index}`}>
                <SortableGroupItem key={`item-${index}`} index={index} value={value.name}/>
            </div>
        );
    });
    return <ul>{itemsList}</ul>;
});