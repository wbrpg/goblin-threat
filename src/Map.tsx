interface MapProps {
    imageUrl: string,
    imageSize: [number, number]
}

function Map({imageUrl}: MapProps) {
    console.log(imageUrl);
    const mapSize = [1000, 1000];
    const mapPosition = [100, 100];
    return (
        <div style={{width: '100vw', overflow: 'hidden'}}>
            <div 
                style={{
                    width: '100vw', aspectRatio: '1',
                    backgroundImage: `url('${imageUrl}')`, 
                    backgroundSize:  `${mapSize[0]}px ${mapSize[1]}px`, 
                    backgroundPosition: `-${mapPosition[0]}px ${mapPosition[1]}px`
                }}
            />
        </div>
    );
}

export default Map;