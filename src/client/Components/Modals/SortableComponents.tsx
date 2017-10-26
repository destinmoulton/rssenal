import React, { Component } from 'react';
import { SortableContainer, SortableElement } from "react-sortable-hoc";

export const SortableGroupItem = SortableElement(({value})=>{
    return <div className="rss-sortgroup-list-item">{value}</div>;
});

export const SortableGroupList = SortableContainer(({items})=>{
    const itemsList = items.map((value, index)=>{

        return (
            <div className="rss-sortgroup-list-container" key={`item-${index}`}>
                <SortableGroupItem key={`item-${index}`} index={index} value={value.name}/>
            </div>
        );
    });
    return <ul>{itemsList}</ul>;
});