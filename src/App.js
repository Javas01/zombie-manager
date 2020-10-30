import { useEffect, useContext } from 'react';
import { Hospital, School, Warehouse } from './components'
import './App.scss';
import { gql, useQuery } from '@apollo/client';
import { Button } from 'antd';
import { useOpenModal } from "./hooks";
import { ZombieContext } from './contexts/ZombieContext'

const GET_ZOMBIES = gql`
  query {
    zombies {
      id,
      name,
      location
    }
  }
`

function App() {
  const [zombies, setZombies] = useContext(ZombieContext)
  const { loading, error, data } = useQuery(GET_ZOMBIES);
  const [openAddModal] = useOpenModal();

  useEffect(() => {
    if (loading === false) setZombies(data.zombies)
  }, [loading])

  return (
    loading ? <p>Loading ...</p> : (
      <div className="App">
        <h1>Zombie Manager</h1>
        <Button type="primary" onClick={openAddModal}>Add Zombie</Button>

        <div className="locations">
          <Hospital />
          <School />
          <Warehouse />
        </div>
      </div>
    )
  );
}

export default App;
