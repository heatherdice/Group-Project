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
    <div className="d-flex justify-content-end col-6 mx-auto p-3">
      <button onClick={inactiveTask} className="btn btn-link text-danger" type="button">Delete</button>
    </div>
  )
}

export default DeleteButton