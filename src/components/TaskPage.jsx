import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './common/Button';
import './styles/TaskPage.css';
import TaskTable from './TaskTable';
import { Stack, Box, Flex } from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';

export default function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const [imapEmails, setImapEmails] = useState([]);
    const [pop3Emails, setPop3Emails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/assignments`);
                console.log(response);
                setTasks(response.data);

            } catch (error) {
                setError('Ошибка при загрузке');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const fetchImapEmails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/mails/imap`);
          setImapEmails(response.data);
          console.log('Удачный имап')
        } catch (error) {
          setError('Ошибка при загрузке IMAP сообщений');
          console.error(error);
        }
      };
    
    
    const fetchPop3Emails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/mails/pop3`);
          setPop3Emails(response.data);
        } catch (error) {
          setError('Ошибка при загрузке POP3 сообщений');
          console.error(error);
        }
      };

    const handleAddTask = () => {
        navigate('/assignments/taskform');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="tasks-page">
            <h1 className="tasks-header">All tasks</h1>
            <Button label="Add new task" onClick={handleAddTask}/>
            <Flex gap="100px" direction="column">
                <div className="tasks-list">
                    <TaskTable items={tasks} setTasks={setTasks}/>
                </div>

            
                <Stack gap="5px">
                    <Flex justify="space-between" align="center">
                        <h2>IMAP Emails</h2>
                        <Button label="Get emails" onClick={fetchImapEmails} />
                    </Flex>
                    <Table.Root size="sm" variant="outline" showColumnBorder>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>From</Table.ColumnHeader>
                                <Table.ColumnHeader>Subject</Table.ColumnHeader>
                                <Table.ColumnHeader>Body</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {imapEmails.map((email, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{email.from || 'Unknown'}</Table.Cell>
                                    <Table.Cell>{email.subject || 'No subject'}</Table.Cell>
                                    <Table.Cell>{email.body || 'No body'}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>

                    </Table.Root>
                </Stack>
            
        
                <Stack gap="5px">
                    <Flex justify="space-between" align="center">
                        <h2>POP3 Emails</h2>
                        <Button label="Get emails" onClick={fetchPop3Emails} />
                    </Flex>
                    <Table.Root size="sm" variant="outline" showColumnBorder>
                    <Table.Header>
                        <Table.Row>
                        <Table.ColumnHeader>From</Table.ColumnHeader>
                        <Table.ColumnHeader>Subject</Table.ColumnHeader>
                        <Table.ColumnHeader>Body</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {pop3Emails.map((email, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{email.from || 'Unknown'}</Table.Cell>
                            <Table.Cell>{email.subject || 'No subject'}</Table.Cell>
                            <Table.Cell>{email.body || 'No body'}</Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                    </Table.Root>
                </Stack>
            
                </Flex>

        </div>
    );
}