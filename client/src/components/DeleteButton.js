import React from 'react';
import axios from 'axios';

const DeleteButton = (props) => {
    const {id, handleDelete} = props

    const inactiveTask = () => {
        axios.put(`http://localhost:8000/api/tasks/${id}`, {state: 'Inactive'})
          .then((res) => {
              console.log(res.data);
              handleDelete();
          })
          .catch((err) => {
              console.log(err);
          });
    }

  return (
    <div>
        <button onClick={inactiveTask} >Delete</button>
    </div>
  )
}

export default DeleteButton