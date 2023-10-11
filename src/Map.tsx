import { useCallback, useEffect, useRef, useState } from "react";

type Point2D = [number, number];
type MapCoordinates = [number, number]

interface MapProps {
    imageUrl: string,
    mapSize: [number, number]
    mapPosition: MapCoordinates
}

function Map({imageUrl, mapSize, mapPosition}: MapProps) {
    const tileSizePx = 100;

    const ref = useRef<HTMLDivElement>(null);
    const [viewportShape, setViewportShape] = useState<[number, number]>([0, 0]);
    const [mapOffset, setMapOffset] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        const storeViewportShape = () => {
            if (ref === null) { return; }
            if (ref.current === null) { return; }
            
            setViewportShape([ref.current.offsetWidth, ref.current.offsetHeight])
        }
        storeViewportShape();

        window.addEventListener('resize', storeViewportShape)
    }, [])

    const centreOnCurrentPosition = useCallback((mapPosition: MapCoordinates) => {
        setMapOffset(mapPosition.map((e, i) => {
            // offset required to place the first tile in the centre translated by the offset required to put the i-th tile in the centre. 1-indexed
            return (viewportShape[i] - tileSizePx)/2 - (e - 1)*tileSizePx;
        }) as [number, number]);
    }, [viewportShape])
    
    useEffect(() => {
        centreOnCurrentPosition(mapPosition);
    }, [centreOnCurrentPosition, mapPosition])

    const positionToMapPosition = (position: Point2D): MapCoordinates | null => {
        const mapPosition = position.map((e, i) => {
            const x = Math.floor((e - mapOffset[i])/tileSizePx) + 1;
            // If the i-th position is out-of-bounds, set to null
            if ((x <= 0) || (x > mapSize[i])) { return null; }
            return x;
        });
        
        // If any value is null, return null 
        if (mapPosition.some(e => e === null)) { return null; }

        return mapPosition as MapCoordinates;
    };

    return (
        <div
            ref={ref}
            style={{
                width: '100vw', 
                overflow: 'hidden',
                backgroundColor: 'gray',
            }}
            onClick={(e) => {
                console.log("click", e.clientX, e.clientY);
                console.log("position", positionToMapPosition([e.clientX, e.clientY]));
            }}>
            <div 
                style={{
                    width: '100vw', aspectRatio: '1',
                    backgroundImage: `url('${imageUrl}')`, 
                    backgroundSize:  `${mapSize[0] * tileSizePx}px`, 
                    backgroundPosition: `${mapOffset[0]}px ${mapOffset[1]}px`,
                    backgroundRepeat: 'no-repeat',
                }}
            />
        </div>
    );
}

export default Map;