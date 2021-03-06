import * as React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { IFolder } from "../../types";

interface ISortableFolderItemProps {
    value: string;
}

export const SortableFolderItem = SortableElement(
    (props: ISortableFolderItemProps) => {
        const { value } = props;
        return <div className="rss-sortfolder-list-item">{value}</div>;
    }
);

interface ISortableFolderListProps {
    items: IFolder[];
    onSortEnd: any;
}

export const SortableFolderList = SortableContainer(
    (props: ISortableFolderListProps) => {
        const { items } = props;
        const itemsList = items.map((value: IFolder, index: number) => {
            return (
                <SortableFolderItem
                    key={`item-${index}`}
                    index={index}
                    value={value.name}
                />
            );
        });
        return <div className="rss-sortfolder-list-container">{itemsList}</div>;
    }
);
