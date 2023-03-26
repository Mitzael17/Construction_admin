import React, {createRef, memo} from 'react';
import {BaseData} from "../../../types/API";
import {StateProps} from "../../../types/components";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const ChosenValuesList = memo(({value, setValue}: StateProps<BaseData[]>) => {

    const items = value.map(item => {
        return {...item, nodeRef: createRef<HTMLLIElement>()}
    });

    return (
        <ul>
            <TransitionGroup>
                {items.map( item => (
                    <CSSTransition timeout={300} key={item.id} nodeRef={item.nodeRef} classNames='scaleHeightTransitionGroup'>
                        <li
                            className={`flex scaleHeightTransitionGroup__item flex-a-c gap-10px`}
                            key={item.id}
                            ref={item.nodeRef}
                        >
                            {item.name} <div onClick={() => setValue(items.filter( value => item.id !== value.id))} className='deleteIcon ml-auto'></div>
                        </li>
                    </CSSTransition>

                ))}
            </TransitionGroup>
        </ul>
    );

});

export default ChosenValuesList;