import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Form from './Form';

const UpdateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {state} = useLocation();
    const [oldTask, setOldTask] = useState(null);

    //getting the task data to use for update by api call or useLocation
    useEffect(() => {
        if(!state){
            axios.get(`http://localhost:8000/api/tasks/${id}`)
            .then((res) => {
                console.log(res.data);
                setOldTask(res.data);
            })
            .catch((err) =>{
                console.log(err)
            })
        }else {
            setOldTask(state)
        }
    }, [id]);

    //make axios put call from form request
    const updateHandler = (task, setErrors) => {
        axios.put(`http://localhost:8000/api/tasks/${id}`, task)
        .then((res) => {
            console.log(res.data);
            navigate(`/`);
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors);
        });
    };

  return (
    <div>
        {/* Sending the old task from the useEffect call to the form */}
        {oldTask && <Form handleSubmit={updateHandler} buttonText={'Save & Update'} oldTask={oldTask} />}
        </div>
  )
}

export default UpdateTask