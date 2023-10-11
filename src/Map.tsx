import { useEffect, useRef, useState } from "react";

interface MapProps {
    imageUrl: string,
    mapSize: [number, number]
}

function Map({imageUrl, mapSize}: MapProps) {
    const tileSizePx = 100;

    const mapPosition = [0, 0].map(e => e * tileSizePx);

    return (
        <div style={{
            width: '100vw', 
            overflow: 'hidden',
            backgroundColor: 'gray',
            }}>
            <div 
                style={{
                    width: '100vw', aspectRatio: '1',
                    backgroundImage: `url('${imageUrl}')`, 
                    backgroundSize:  `${mapSize[0] * tileSizePx}px`, 
                    backgroundPosition: `${mapPosition[0]}px ${mapPosition[1]}px`,
                    backgroundRepeat: 'no-repeat',
                }}
            />
        </div>
    );
}

export default Map;