import { useContext, useRef } from 'react'
import { Modal, Input, Select, Form, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { gql, useMutation } from '@apollo/client'
import { addZombie, editZombie, deleteZombie } from '../utils'
import { ZombieContext } from '../contexts/ZombieContext'

const ADD_ZOMBIE = gql`
  mutation CreateZombie($name: String!, $location: String!) {
    createZombie(name: $name, location: $location) {
      id,
      name,
      location
    }
  }
`
const EDIT_ZOMBIE = gql`
  mutation EditZombie($id: ID!, $name: String, $location: String) {
    editZombie(id: $id, name: $name, location: $location) {
      id,
      name,
      location
    }
  }
`
const DELETE_ZOMBIE = gql`
  mutation DeleteZombie($id: ID!) {
    deleteZombie(id: $id) {
      id,
      name,
      location
    }
  }
`

export default function useOpenModal (name, location, id) {
  const [zombies, setZombies] = useContext(ZombieContext)
  const [addZombieMutation] = useMutation(ADD_ZOMBIE)
  const [editZombieMutation] = useMutation(EDIT_ZOMBIE)
  const [deleteZombieMutation] = useMutation(DELETE_ZOMBIE)
  const form = useRef('')

  const { confirm } = Modal

  const addModal = (
    <Form ref={form}>
      <Form.Item name='input'>
        <Input addonBefore='name' placeholder='cool zombie name' />
      </Form.Item>
      <Form.Item name='select'>
        <Select
          showSearch
          style={{ maxWidth: 315, width: '100%' }}
          placeholder='location'
          optionFilterProp='children'
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Select.Option value='hospital'>Hospital</Select.Option>
          <Select.Option value='school'>School</Select.Option>
          <Select.Option value='warehouse'>Warehouse</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  )

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
          optionFilterProp='children'
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Select.Option value='hospital'>Hospital</Select.Option>
          <Select.Option value='school'>School</Select.Option>
          <Select.Option value='warehouse'>Warehouse</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  )

  const openAdd = () => {
    confirm({
      title: 'Add new Zombie',
      content: addModal,
      onOk () {
        const { input, select } = form.current.getFieldValue()
        if (input && select) {
          setZombies(addZombie(zombies, input, select))
          addZombieMutation({ variables: { name: input, location: select } })
        } else {
          alert('fill in all fields')
        }
      }
    })
  }
  const openEdit = () => {
    confirm({
      title: `Edit ${name}`,
      content: editModal,
      onOk () {
        const { input, select } = form.current.getFieldValue()
        setZombies(editZombie(zombies, input, select, id))
        editZombieMutation({ variables: { id: id, name: input, location: select } })
      }
    })
  }
  const openDelete = () => {
    confirm({
      title: `Delete ${name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () {
        setZombies(deleteZombie(zombies, id))
        deleteZombieMutation({ variables: { id: id } })
        message.info(`${name} deleted`, 5)
      }
    })
  }

  return [openAdd, openEdit, openDelete]
}
