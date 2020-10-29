import { useRenderZombies } from "../hooks/useRenderZombies";

export default function Warehouse() {
  return (
    <div className="warehouse">
      <h2>Warehouse</h2>
      {useRenderZombies('warehouse')}
    </div>
  )
}
