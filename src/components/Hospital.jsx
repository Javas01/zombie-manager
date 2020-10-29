import { useRenderZombies } from "../hooks/useRenderZombies";

export default function Hospital() {
  return (
    <div className="hospital">
      <h2>Hospital</h2>
      {useRenderZombies('hospital')}
    </div>
  )
}
