import { Hospital, School, Warehouse } from './components'
import './App.scss'
import { Button } from 'antd'
import { useGetZombies, useOpenModal } from './hooks'

function App () {
  const loading = useGetZombies()
  const [openAddModal] = useOpenModal()

  return (
    loading
      ? <p>Loading ...</p>
      : (
        <div className='App'>
          <h1>Zombie Manager</h1>
          <Button type='primary' onClick={openAddModal}>Add Zombie</Button>

          <div className='locations'>
            <Hospital />
            <School />
            <Warehouse />
          </div>
        </div>
        )
  )
}

export default App
