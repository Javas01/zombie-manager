import { Button } from 'antd';
import { useOpenModal } from "../hooks";

export default function Zombie({name, location, id}) {
  const [_, openEditModal, openDeleteModal] = useOpenModal(name, location, id)

  return (
    <>
      <h3>{name}</h3>
      <Button type="primary" onClick={openEditModal}>Edit</Button>
      <Button type="danger" onClick={openDeleteModal}>Delete</Button>
    </>
  )
}
