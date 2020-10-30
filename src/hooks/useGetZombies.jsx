import { useEffect, useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import { ZombieContext } from '../contexts/ZombieContext'

const GET_ZOMBIES = gql`
query {
  zombies {
    id,
    name,
    location
  }
}
`

export default function useGetZombies () {
  const [, setZombies] = useContext(ZombieContext)
  const { loading, error, data } = useQuery(GET_ZOMBIES)

  useEffect(() => {
    if (loading === false) setZombies(data.zombies)
    if (error) throw new Error(error)
  }, [loading])

  return loading
}
