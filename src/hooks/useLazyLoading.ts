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
    const generatorId = useGeneratorId();


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

    useEffect( () => {

        if(page === 0) return;

        const requestId = generatorId();

        (async function() {

            setIsLoading(true);

            const response = await callback(page);

            if(ignoreRequests.current.indexOf(requestId) !== -1) return;

            setData(prevData => [...prevData, ...response]);
            setIsLoading(false);

            ignoreRequests.current = [];

            (nodeRef.current as HTMLDivElement).dataset.loading = 'false';

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