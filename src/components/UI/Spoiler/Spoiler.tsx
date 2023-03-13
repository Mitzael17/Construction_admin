import React, {memo, useRef, useState} from 'react';

const Spoiler = memo(({title, items}: {title: JSX.Element, items: JSX.Element}) => {

    const [isShow, setIsShow] = useState(false);
    const listRef = useRef<HTMLDivElement>({} as HTMLDivElement);

    return (
        <div
            onClick={handleClick}
            className={`spoilerList sidebar__item ${isShow ?  'active-list': ''}`}
        >
            <div className='pointer-cursor flex spoilerList__title'>
                {title}
            </div>
            <div onTransitionEnd={handleTransitionEnd} ref={listRef} className="spoilerList__wrapper">
                {items}
            </div>
        </div>
    );

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {

        if((event.target as HTMLDivElement).closest('.spoilerList__wrapper') &&
            !(event.target as HTMLDivElement).closest('a')) return;

        if(isShow) {

            setIsShow(false);
            listRef.current.style.height = listRef.current.offsetHeight + 'px';

            setTimeout(() => {
                listRef.current.style.height = '0px';
            }, 20);

        }
        else {

            setIsShow(true);
            listRef.current.style.height = listRef.current.scrollHeight + 'px';

        }

    }
    function handleTransitionEnd(event: React.TransitionEvent<HTMLDivElement>) {

        if(!isShow || event.propertyName !== 'height') return;

        listRef.current.style.height = 'auto';

    }

});

export default Spoiler;