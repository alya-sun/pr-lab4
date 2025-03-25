import { HStack, IconButton, Stack, Table, TableCell, Tag } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import './styles/TaskPage.css'
import axios from 'axios';


const TaskTable = ({items, setTasks}) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleTaskClick = (taskId) => {
        navigate(`/assignments/${taskId}`);
    };

    const handleEdit = (taskId) => {
      navigate(`/assignments/edit/${taskId}`);
    };
  
    const handleDelete = async (taskId) => {
      try {
        await axios.delete(`http://localhost:8080/api/assignments/${taskId}`);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        // navigate('/');
      } catch (error) {
        setError('Ошибка при удалении');
      }
    };
    
    return(
        <Stack gap="10">
            <Table.Root size="lg" variant="outline" showColumnBorder>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Title</Table.ColumnHeader>
                <Table.ColumnHeader>Description</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Status</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map((item) => (
                <Table.Row key={item.id} >
                    <Table.Cell onClick={()=> handleTaskClick(item.id)} _hover={{ cursor: 'pointer', bg: 'gray.50' }}>{item.title}</Table.Cell>
                  <Table.Cell onClick={()=> handleTaskClick(item.id)} _hover={{ cursor: 'pointer', bg: 'gray.50' }}>{item.description}</Table.Cell>
                  <Table.Cell onClick={()=> handleTaskClick(item.id)} _hover={{ cursor: 'pointer', bg: 'gray.50' }} width="120px" textAlign="center">{item.status === 0 ? 
                    <Tag.Root size="lg" colorPalette="purple">
                        <Tag.Label>New</Tag.Label>
                    </Tag.Root>
                  : item.status === 1 ? 
                    <Tag.Root size="lg" colorPalette="yellow">
                        <Tag.Label>Pending</Tag.Label>
                    </Tag.Root>
                  : <Tag.Root size="lg" colorPalette="green">
                        <Tag.Label>Done</Tag.Label>
                    </Tag.Root>
                  }
                  </Table.Cell>

                  <Table.Cell width="120px"> 
                    <div className="task-page-actions">
                      <HStack display="flex" justify="center" wrap="wrap" gap="5px">
                          <IconButton size="sm" aria-label="Edit" colorPalette="purple" onClick={() => handleEdit(item.id)}>
                              <FaEdit/>
                          </IconButton>
                          <IconButton size="sm" aria-label="Delete" colorPalette="purple" onClick={() => handleDelete(item.id)}>
                              <MdDeleteOutline />
                          </IconButton>
                      </HStack>
                    </div>
                    
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>
    )
}

export default TaskTable