import { ZombieContext } from '../contexts/ZombieContext'
import { useContext } from 'react'
import { Zombie } from '../components'

export default function useRenderZombies (location) {
  const [zombies] = useContext(ZombieContext)
  console.log(zombies)
  const quarantinedZombies = zombies.filter(zombie => zombie.location === location)

  return (
    <ul>
      {quarantinedZombies.map((zombie, i) => (
        <li key={i}>
          <Zombie name={zombie.name} location={zombie.location} id={zombie.id} />
        </li>
      ))}
    </ul>
  )
}
