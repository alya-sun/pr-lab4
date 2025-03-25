import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from './common/Button'
import './styles/TaskDetails.css';

export default function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/assignments/${taskId}`);
        setTaskData(response.data);
      } catch (error) {
        setError('Ошибка при загрузке');
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
  }, [taskId]);

  const handleEdit = () => {
    navigate(`/assignments/edit/${taskId}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/assignments/${taskId}`);
      navigate('/');
    } catch (error) {
      setError('Ошибка при удалении');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="task-page">

      <Button label='Back' onClick={handleBack} className='back-button' />

      <h1 className='task-title'>{taskData.title}</h1>

      <div className='task-content'>
        <div className='task-left'>
          <p className='task-description'>{taskData.description}</p>
        </div>

        < div className='task-right'>
          <p><strong>Status</strong> {taskData.status === 0 ? 'New' : taskData.status === 1 ? 'Pending' : 'Done'}</p>
        </div>
      </div>


      {
        <div className="task-page-actions">
          <Button label="Edit" onClick={handleEdit} />
          <Button label="Delete" onClick={handleDelete} />
        </div>
      }
    </div>
  );
}