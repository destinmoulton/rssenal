import React, { Component } from 'react';
import { SortableContainer, SortableElement } from "react-sortable-hoc";

export const SortableGroupItem = SortableElement(({value})=>{
    return <li>{value}</li>;
});

export const SortableGroupList = SortableContainer(({items})=>{
    const itemsList = items.map((value, index)=>{
        return <SortableGroupItem key={`item-${index}`} index={index} value={value.name}/>;
    });
    return <ul>{itemsList}</ul>;
});