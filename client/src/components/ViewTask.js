import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

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
    <div className={task.color}>
        <p> {task.name} </p>
        <p> Color: {task.color} </p>
        <p> Description: {task.description} </p>
        <p> Assigned To: {task.assigned} </p>
        <p> State: {task.state} </p>
        <p> Due Date: {convertDate(task.dueDate)} </p>
        <Link to={`/updatetask/${task._id}`}><button>Update</button></Link>
    </div>
  )
}

export default ViewTask