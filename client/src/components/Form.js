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
        assigned:'',
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
                  name="assigned"
                  value={task.assigned}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Assigned to...</option>
                  {members.map((member, index) => {
                    return(
                      <option key={index} value={member.name}>{member.name}</option>
                    );
                  })}
                </select>
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
                  value={convertDate(task.dueDate)}
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
                value={task.state = buttonState}
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
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-link text-secondary" onClick={ () => navigate("/")}>Cancel</button>
            <input className="btn btn-secondary" type="submit" value={buttonText} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
