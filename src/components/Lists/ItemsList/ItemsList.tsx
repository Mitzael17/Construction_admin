import React, {createRef, memo} from 'react';
import {ListProps} from "../../../types/components/ListsComponents";
import classes from "./ItemsList.module.scss";
import {useNavigate} from "react-router-dom";
import CheckBox from "../../UI/CheckBox/CheckBox";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const ItemsList = memo(({items, statusClasses, onChecked, checkedItems}: ListProps) => {

    const navigate = useNavigate();

    const elements = items.map( item => {
        return {...item, nodeRef: createRef<HTMLLIElement>()}
    });

    return (
        <div>
            <ul className={`${classes.list} ${items.length === 0 ? classes.empty : ''}`}>
                <TransitionGroup>
                    {elements.map( item => (
                        <CSSTransition timeout={500} key={item.id} classNames='opacityTransitionGroup' nodeRef={item.nodeRef}>
                            <li
                                className={`
                                    opacityTransitionGroup__item
                                    ${classes.item} 
                                    ${item.status && statusClasses ? statusClasses.get(item.status) ?? '' : ''}
                                    ${typeof item.link !== 'undefined' ? `${classes.hover} pointer-cursor` : ''}
                                `}
                                onClick={ () => {

                                    if(typeof item.link === 'undefined') return;
                                    navigate(item.link);

                                }}
                                ref={item.nodeRef}
                            >
                                <div>
                                    <div className={classes.title}>
                                        {item.title}
                                    </div>
                                    {item.subtitle && <div className={`${classes.subtitle} mt-10px`}>{item.subtitle}</div>}
                                    {item.date && <div className={`${classes.subtitle} mt-5px`}>{item.date}</div>}
                                </div>
                                {typeof onChecked !== 'undefined' &&
                                    <div className='label-paddings'>
                                        <CheckBox checked={checkedItems && checkedItems.indexOf(`${item.id}`) !== -1} onChange={onChecked} name={`${item.id}`} />
                                    </div>
                                }
                            </li>
                        </CSSTransition>

                    ))}
                </TransitionGroup>
            </ul>
        </div>
    );
});

export default ItemsList;