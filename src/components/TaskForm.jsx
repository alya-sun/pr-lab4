import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from './common/InputField';
import SelectField from './common/SelectField';
import Button from './common/Button';
import TextareaField from './common/TextareaField';
import './styles/TaskForm.css';

export default function TaskFrom() {
    const { taskId } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: 0
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);

    
    useEffect(() => {
        if (taskId) {
            setIsEditMode(true);
            const fetchTaskData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/assignments/${taskId}`);
                    setFormData({
                        title: response.data.title,
                        status: response.data.status,
                        description: response.data.description,
                        email: response.data.email
                    });
                } catch (error) {
                    console.error("Ошибка при загрузке данных", error.response ? error.response.data : error.message);
                }
            };

            fetchTaskData();
        }
    }, [taskId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
         });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.title) newErrors.title = "Поле обязательно для заполнения";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formDataToSend = {
            ...formData,
            status: parseInt(formData.status)
        };

        try {
            if (isEditMode) {
                const response = await axios.put(`http://localhost:8080/api/assignments/${taskId}`, formDataToSend, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                navigate(`/assignments/${taskId}`);
            } else {
                const response = await axios.post(`http://localhost:8080/api/assignments`, formDataToSend, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                navigate(`/assignments/${response.data.id}`);
            }

        } catch (error) {
            console.error("Ошибка при сохранении", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='task-form-page'>
            <div className='task-form-container'>
                <h2 className='task-form-header'>
                    {isEditMode ? 'Edit the task' : 'Fill the task'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Title"
                        title="Title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={errors.title}
                    />

                    <TextareaField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />

                    <SelectField
                        label="Status"
                        name="status"
                        value={formData.status}
                        options={[
                            { value: 0, label: "New" },
                            { value: 1, label: "Pending" },
                            { value: 2, label: "Done" }
                        ]}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Email"
                        title="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <Button label={isEditMode ? "Save changes" : "Add the task"} buttonType="submit" />
                </form>
            </div>
        </div>
    )
}