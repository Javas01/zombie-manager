import { createContext, useState } from 'react'

const ZombieContext = createContext();

const ZombieProvider = (props) => {
  const [zombies, setZombies] = useState([]);
  return (
    <ZombieContext.Provider value={[zombies, setZombies]}>
      {props.children}
    </ZombieContext.Provider>
  );
}

export { ZombieContext, ZombieProvider };
