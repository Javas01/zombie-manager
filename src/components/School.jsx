import { useRenderZombies } from '../hooks'

export default function School () {
  return (
    <div className='school'>
      <h2>School</h2>
      {useRenderZombies('school')}
    </div>
  )
}
