import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";
import {useGeneratorId} from "./useGeneratorId";

export const useLazyLoading = <D>(nodeRef: MutableRefObject<HTMLDivElement|null>,
                                  limit: number,
                                  callback: (page: number) => Promise<D[]>
): [D[], Dispatch<SetStateAction<D[]>>, boolean, boolean, () => void] => {

    const [data, setData] = useState<D[]>([]);
    const [page, setPage] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [isOver, setIsOver] = useState(false);

    const ignoreRequests = useRef<number[]>([]);
    const generatorRequestId = useGeneratorId();

    /*
        The statement is required to load data from server, if The IntersectionObserver can't be launched!
        When the user's monitor has a large height and a first part of data is not able to fill it completely,
        The statement will trigger a next request to extract data from next page.
        It will continue sending requests, until the monitor of user is completely filled of information.
        The further requests will be called by IntersectionObserver.
    */
    if(page > 0 && !isLoading && nodeRef.current?.dataset.loading !== 'true' && !isOver) {

        setTimeout( () => {

            if(!nodeRef.current || nodeRef.current?.dataset.loading === 'true') return;

            let top = nodeRef.current.getBoundingClientRect().top;

            if(!(top < window.innerHeight && top > 0)) return;

            nodeRef.current.dataset.loading = 'true';

            setPage(prevPage => prevPage + 1);

        }, 50);

    }


    const observer = useRef(new IntersectionObserver( (entries) => {

        if(!entries[0].isIntersecting || (entries[0].target as HTMLDivElement).dataset.loading === 'true') return;

        // Here, we can't get value from isLoading state,
        // but we can store the value in data attributes and get it anywhere.
        (entries[0].target as HTMLDivElement).dataset.loading = 'true';

        setPage(prevPage => prevPage + 1);

    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    }));

    const reset = () => {

        observer.current.disconnect();

        setPage(0);
        setData([]);
        setIsOver(false);
        setIsLoading(false);

        if(!nodeRef.current) throw new Error('The element wasn\'t found');

        nodeRef.current.dataset.loading = 'false';
        observer.current.observe(nodeRef.current);

    }


    useEffect( () => {

        if(!nodeRef.current) return;

        observer.current.observe(nodeRef.current);

        return () => {
            observer.current.disconnect();
        }

    }, [nodeRef]);

    // Main part of code, that makes requests.
    useEffect( () => {

        if(page === 0) return;

        const requestId = generatorRequestId();

        (async function() {

            setIsLoading(true);

            const response = await callback(page);

            if(ignoreRequests.current.indexOf(requestId) !== -1) return;

            setData(prevData => [...prevData, ...response]);
            setIsLoading(false);

            ignoreRequests.current = [];

            (nodeRef.current as HTMLDivElement).dataset.loading = 'false';

            // Last page detection
            if(response.length < limit) {

                observer.current.disconnect();
                setIsOver(true);

            }

        })();

        return () => {

            ignoreRequests.current.push(requestId);

        }

    }, [page]);

    return [data, setData, isLoading, isOver, reset];

}