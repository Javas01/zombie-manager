import { useRenderZombies } from "../hooks";

export default function Warehouse() {
  return (
    <div className="warehouse">
      <h2>Warehouse</h2>
      {useRenderZombies('warehouse')}
    </div>
  )
}
