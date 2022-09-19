import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const ViewTask = () => {
    const [task, setTask] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/tasks/${id}`)
        .then((res) => {
            console.log(res.data);
            setTask(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])



    //convert date to usable format
  const convertDate = (dataDate) => {
    let newDate = new Date(dataDate);
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate() + 1;
    let year = newDate.getFullYear();

    if (parseInt(month) < 10) {
      month = "0" + month;
    }

    if (parseInt(day) < 10) {
      day = "0" + day;
    }

    return `${month}-${day}-${year}`;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 mx-auto">
          <div className="border border-dark rounded shadow p-3">
            <p className="h2"> {task.name} </p>
            <p> <span className="fw-bold">Color:</span> {task.color} </p>
            <p> <span className="fw-bold">Description:</span> {task.description} </p>
            <p> <span className="fw-bold">Assigned To:</span> {task.assigned} </p>
            <p> <span className="fw-bold">State:</span> {task.state} </p>
            <p> <span className="fw-bold">Due Date:</span> {convertDate(task.dueDate)} </p>
            <div className="d-flex gap-2 justify-content-end">
              <Link to={`/updatetask/${task._id}`}><button className="btn btn-primary" type="button">Update</button></Link>
              <DeleteButton id={task._id} handleDelete={() => navigate('/') }/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTask