import { useEffect, useContext, useRef } from 'react';
import { Hospital, School, Warehouse } from './components'
import './App.scss';
import { gql, useQuery, useMutation} from '@apollo/client';
import { ZombieContext } from './contexts/ZombieContext'
import { Modal, Button, Input, Select, Form } from 'antd';
import { addZombie } from './utils'

const ADD_ZOMBIE = gql`
  mutation CreateZombie($name: String!, $location: String!) {
    createZombie(name: $name, location: $location) {
      id,
      name,
      location
    }
  }
`;
const GET_ZOMBIES = gql`
  query {
    zombies {
      id,
      name,
      location
    }
  }
`

function App() {
  const [zombies, setZombies] = useContext(ZombieContext);
  const form = useRef('');

  const { loading, error, data } = useQuery(GET_ZOMBIES);
  const [addNewZombie] = useMutation(ADD_ZOMBIE);

  const addModal = (
    <Form ref={form}>
      <Form.Item name='input'>
        <Input addonBefore='name' placeholder={'cool zombie name'} />
      </Form.Item>
      <Form.Item name='select'>
        <Select
          showSearch
          style={{ maxWidth: 315, width: '100%' }}
          placeholder={'location'}
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

  const { confirm } = Modal;

  useEffect(() => {
    if (loading === false) setZombies(data.zombies)
  }, [loading])

  const openAdd = () => {
    confirm({
      title: `Add new Zombie`,
      content: addModal,
      onOk() {
        const {input, select}  = form.current.getFieldValue()
        if(input && select) {
          setZombies(addZombie(zombies, input, select))
          addNewZombie({ variables: { name: input, location: select } });
        }
        else{
          alert('fill in all fields')
        }
      }
    });
  }


  return (
    loading ? <p>Loading ...</p> : (
      <div className="App">
        <h1>Zombie Manager</h1>
        <Button type="primary" onClick={openAdd}>Add Zombie</Button>

        <div className="locations">
          <Hospital />
          <School />
          <Warehouse />
        </div>
      </div>
    )
  );
}

export default App;
