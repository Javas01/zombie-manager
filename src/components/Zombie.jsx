import { useState, useContext, useRef } from 'react'
import { Modal, Button, Input, Select, Form } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { gql, useMutation} from '@apollo/client';
import { editZombie, deleteZombie } from '../utils'
import { ZombieContext } from '../contexts/ZombieContext'

const EDIT_ZOMBIE = gql`
  mutation EditZombie($id: ID!, $name: String, $location: String) {
    editZombie(id: $id, name: $name, location: $location) {
      id,
      name,
      location
    }
  }
`;
const DELETE_ZOMBIE = gql`
  mutation DeleteZombie($id: ID!) {
    deleteZombie(id: $id) {
      id,
      name,
      location
    }
  }
`;

export default function Zombie({name, location, id}) {
  const [zombies, setZombies] = useContext(ZombieContext)
  const [deleteNewZombie] = useMutation(DELETE_ZOMBIE);
  const [editNewZombie] = useMutation(EDIT_ZOMBIE);
  const form = useRef('');

  const { confirm } = Modal;

  const editModal = (
    <Form ref={form}>
      <Form.Item name='input'>
        <Input addonBefore='name' defaultValue={name} />
      </Form.Item>
      <Form.Item name='select'>
        <Select
          showSearch
          style={{ maxWidth: 315, width: '100%' }}
          defaultValue={location}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Select.Option value="school">School</Select.Option>
          <Select.Option value="warehouse">Warehouse</Select.Option>
          <Select.Option value="hospital">Hospital</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  )

  const openEdit = () => {
    confirm({
      title: `Edit ${name}`,
      content: editModal,
      onOk() {
        let {input, select}  = form.current.getFieldValue()
        setZombies(editZombie(zombies, input, select, id))
        editNewZombie({ variables: { id: id, name: input, location: select } })
      }
    });
  }

  const openDelete = () => {
    confirm({
      title: `Delete ${name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setZombies(deleteZombie(zombies, id))
        deleteNewZombie({ variables: { id: id } })
      }
    });
  }

  return (
    <>
      <h3>{name}</h3>
      <Button type="primary" onClick={openEdit}>Edit</Button>
      <Button type="danger" onClick={openDelete}>Delete</Button>
    </>
  )
}
