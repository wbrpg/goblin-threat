import { useCallback, useEffect, useRef, useState } from "react";

interface MapProps {
    imageUrl: string,
    mapSize: [number, number]
    mapPosition: [number, number]
}

function Map({imageUrl, mapSize, mapPosition}: MapProps) {
    const tileSizePx = 100;

    const ref = useRef<HTMLDivElement>(null);
    const [viewportShape, setViewportShape] = useState<[number, number]>([0, 0]);
    const [backgroundPosition, setBackgroundPosition] = useState('0px 0px')

    useEffect(() => {
        const storeViewportShape = () => {
            if (ref === null) { return; }
            if (ref.current === null) { return; }
            
            setViewportShape([ref.current.offsetWidth, ref.current.offsetHeight])
        }
        storeViewportShape();

        window.addEventListener('resize', storeViewportShape)
    }, [])

    const centreOnCurrentPosition = useCallback((mapPosition: [number, number]) => {
        const offsets = mapPosition.map((e, i) => {
            // offset required to place the first tile in the centre translated by the offset required to put the i-th tile in the centre. 1-indexed
            return (viewportShape[i] - tileSizePx)/2 - (e - 1)*tileSizePx;
        });

        setBackgroundPosition(`${offsets[0]}px ${offsets[1]}px`)
    }, [viewportShape])
    
    useEffect(() => {
        centreOnCurrentPosition(mapPosition);
    }, [centreOnCurrentPosition, mapPosition])

    return (
        <div style={{
            width: '100vw', 
            overflow: 'hidden',
            backgroundColor: 'gray',
            }}>
            <div 
                ref={ref}
                style={{
                    width: '100vw', aspectRatio: '1',
                    backgroundImage: `url('${imageUrl}')`, 
                    backgroundSize:  `${mapSize[0] * tileSizePx}px`, 
                    backgroundPosition: backgroundPosition,
                    backgroundRepeat: 'no-repeat',
                }}
            />
        </div>
    );
}

export default Map;