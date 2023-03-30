import React, {createRef, memo, useMemo} from 'react';
import {ListItemWithNode, ListProps} from "../../../types/components/ListsComponents";
import classes from "./ItemsList.module.scss";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ItemsListLi from "./ItemsListLi";

const ItemsList = memo(({items, statusClasses, onChecked, checkedItems}: ListProps) => {

    // Prevent redundant renders by using useMemo hook (Items render inside the hook)
    const itemsList = useMemo(() => {

        const elements = items.map( element => {

            // The nodeRef is necessary for CSSTransition
            const item: ListItemWithNode = {...element, nodeRef: createRef<HTMLLIElement>()}

            return (
                <CSSTransition timeout={500} key={item.id} classNames='opacityTransitionGroup' nodeRef={item.nodeRef}>
                    <ItemsListLi
                        item={item}
                        status={item.status && statusClasses ? statusClasses.get(item.status) ?? '' : ''}
                        isChecked={checkedItems && checkedItems.indexOf(`${item.id}`) !== -1}
                        onChecked={onChecked}
                    />
                </CSSTransition>
            );

        });

        return <TransitionGroup>{elements}</TransitionGroup>;

    }, [items]);

    return (
        <ul className={`${classes.list} ${items.length === 0 ? classes.empty : ''}`}>
            {itemsList}
        </ul>
    );
});

export default ItemsList;