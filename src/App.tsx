import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './Map';
import YAML from 'yaml'

interface Config {
  maps: string[]
}

function App() {
  const [config, setConfig] = useState<Config>();
  const [maps, setMaps] = useState<{[name: string]: any}>({});
  const [currentMap, setCurrentMap] = useState("wagon-in-field");

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/config.json`)
      .then(response => response.json())
      .then(json => setConfig(json));
    }, []);

  useEffect(() => {
    if (config === undefined) {
      return;
    }

    config.maps.forEach(map => {
      fetch(`${process.env.PUBLIC_URL}/data/maps/${map}.yaml`)
        .then(response => response.text())
        .then(text => {
          setMaps(maps => { return {...maps, [map]: YAML.parse(text)}})
        })
    });
  }, [config])

  return (
    <div className="App">
      {(function () {
        const currentMapData = maps[currentMap];
        if (currentMapData === undefined) { return; }
        
        return <Map 
          imageUrl={currentMapData['image url']} 
          mapSize={currentMapData['map size']} 
          mapPosition={[1, 1]}/>
        })()
      }
    </div>
  );
}

export default App;
