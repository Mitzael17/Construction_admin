import React from 'react';
import classes from "./ItemsList.module.scss";
import CheckBox from "../../UI/CheckBox/CheckBox";
import {ListItemsItemProps} from "../../../types/components/ListsComponents";
import {useNavigate} from "react-router-dom";

const ItemsListLi = ({item, status, isChecked, onChecked}: ListItemsItemProps) => {

    const navigate = useNavigate();

    return (
        <li
            className={`
                opacityTransitionGroup__item
                ${classes.item} 
                ${status ? status : ''}
                ${typeof item.link !== 'undefined' ? `${classes.hover} pointer-cursor` : ''}
            `}
            onClick={handlerClick}
            ref={item.nodeRef}
        >
            <div>
                <div className={classes.title}>{item.title}</div>
                { item.subtitle &&
                    <div className={`${classes.subtitle} mt-10px`}>{item.subtitle}</div>
                }
                { item.date &&
                    <div className={`${classes.subtitle} mt-5px`}>{item.date}</div>
                }
            </div>
            { typeof onChecked !== 'undefined' &&
                <div className='label-paddings'>
                    <CheckBox checked={isChecked} onChange={onChecked} name={`${item.id}`} />
                </div>
            }
        </li>
    );

    function handlerClick() {

        if(typeof item.link === 'undefined') return;

        navigate(item.link);

    }

};

export default ItemsListLi;