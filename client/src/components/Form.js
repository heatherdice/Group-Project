import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Form = (props) => {
    const {handleSubmit, buttonText, oldTask, buttonState, setButtonState} = props;
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();

    //state for task model; will be filled on or blank if an old task exists
    const [task, setTask] = useState(oldTask || {
        name:'',
        color:'',
        description:'',
        service:'',
        state:'',
        assignedRef:'',
        dueDate:''
    });

  //set validation errors
  const [errors, setErrors] = useState("");

  //get all members
  useEffect(() => {
    axios.get("http://localhost:8000/api/members")
    .then(res => {
      console.log(res.data);
      setMembers(res.data)
    })
    .catch(err => console.log(err))
  },[]);

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

    return `${year}-${month}-${day}`;
  };

  //sends task and error information to axios request in called component
  const submitHandler = (e) => {
    e.preventDefault();
    handleSubmit(task, setErrors);
  };

  //handle the changes in form and set in task state
  const handleChange = (e) => {
    setTask({...task, [e.target.name]: e.target.value});
  }

  return (
    <div className="row">
      <div className={`col-6 mx-auto border border-dark p-3 rounded shadow ${task.color}`}>
        <form onSubmit={submitHandler}>
          <div className="row pb-3">
            {
              buttonText === "Save & Close" ?
              <p className="h2">Create Task</p> :
              <p className="h2">Update {task.name}</p>
            }
          </div>
          <div className="row">
            <div className="col-3">
              <label className="form-label">Task Name</label>
            </div>
            <div className="col">
              <input
                className="form-control"
                type="text"
                name="name"
                value={task.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-3">
              <label className="form-label">Service Type</label>
            </div>
            <div className="col">
              <select
                name="service"
                type="text"
                className="form-select"
                value={task.service}
                onChange={handleChange}
              >
              <option value="" disabled hidden>Select Service Type...</option>
              <option value="Regular">Regular</option>
              <option value="Expedited">Expedited</option>
              </select>
              {errors.service && (
                <p className="text-danger">{errors.service.message}</p>
              )}
            </div>
          </div>
          <div className="row mt-2">
              <div className="col-3">
                <label className="form-label">Color</label>
              </div>
              <div className="col">
                <select
                name="color"
                type="text"
                className="form-select"
                value={task.color}
                onChange={handleChange}
                >
                  <option value="" disabled hidden>Select Color...</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Red">Red</option>
                  <option value="Orange">Orange</option>
                  <option value="Blue">Blue</option>
                  <option value="Purple">Purple</option>
                  <option value="Green">Green</option>
                </select>
                {errors.color && (
                <p className="text-danger">{errors.color.message}</p>
                )}
              </div>
          </div>
          <div className="row mt-2">
              <div className="col-3">
                <label className="form-label">Task Description</label>
              </div>
              <div className="col">
                <textarea
                  className="form-control"
                  name="description"
                  rows="4"
                  cols="50"
                  value={task.description}
                  onChange={handleChange}
                ></textarea>
                {errors.description && (
                <p className="text-danger">{errors.description.message}</p>
                )}
              </div>
          </div>
          <div className="row mt-2">
              <div className="col-3">
                <label className="form-label">Assigned To</label>
              </div>
              <div className="col">
                <select
                  className="form-select"
                  type="text"
                  name="assignedRef"
                  value={ task.assignedRef._id }
                  onChange={handleChange}
                >
                  <option value="">Assigned to...</option>
                  {members.filter(members => members.active === true).map((oneMember, index) => {
                    return(
                      <option key={index} value={oneMember._id}>{oneMember.name}</option>
                    );
                  })}
                </select>
                {errors.assignedRef && (
                  <p className="text-danger">Assigned to is required</p>
                )}
              </div>
          </div>
          <div className="row mt-2">
              <div className="col-3">
                <label className="form-label">Due Date</label>
              </div>
              <div className="col">
                <input
                  className="form-control"
                  type="date"
                  name="dueDate"
                  value={buttonText === "Save & Update" ?
                        convertDate(task.dueDate) :
                        task.dueDate}
                  onChange={handleChange}
                />
              </div>
          </div>
          <div className="row mt-2">
            <div className="col-3">
              <label className="form-label">State Of Task</label>
            </div>
            <div className="col">
              <select
                name="state"
                type="text"
                className="form-select"
                value={buttonText === "Save & Close" ?
                task.state = task.state || buttonState :
                task.state}
                onChange={handleChange}
              >
                <option value="" disabled hidden>State of Task...</option>
                <option value="To-Do">To-Do</option>
                <option value="Do Today">Do Today</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Done">Done</option>
              </select>
              {errors.state && (
                  <p className="text-danger">{errors.state.message}</p>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3 gap-2">
            <button className="btn btn-outline-secondary" onClick={ () => navigate("/")}>Cancel</button>
            <input className="btn btn-secondary" type="submit" value={buttonText} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
