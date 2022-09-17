import { useState } from "react";

const Form = (props) => {
    const {handleSubmit, buttonText} = props;

    //state for task model
    const [task, setTask] = useState({
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

    console.log(`${year}-${month}-${day}`);

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
    <div>
      <form onSubmit={submitHandler} className="m-2">
        {errors.name && (
          <p className="m-0 text-danger">{errors.name.message}</p>
        )}
        <input
          className="d-block m-2"
          type="text"
          placeholder="Task name..."
          name="name"
          value={task.name}
          onChange={handleChange}
        />

        {errors.service && (
          <p className="m-0 text-danger">{errors.service.message}</p>
        )}
        <select
          name="service"
          type="text"
          className="d-block m-2"
          value={task.service}
          onChange={handleChange}
        >
          <option value="">Service Type...</option>
          <option value="Regular">Regular</option>
          <option value="Expedited">Expedited</option>
        </select>

        {errors.color && (
          <p className="m-0 text-danger">{errors.color.message}</p>
        )}
        <select
          name="color"
          type="text"
          className="d-block m-2"
          value={task.color}
          onChange={handleChange}
        >
          <option value="Yellow">Yellow</option>
          <option value="Red">Red</option>
          <option value="Orange">Orange</option>
          <option value="Blue">Blue</option>
          <option value="Purple">Purple</option>
          <option value="Green">Green</option>
        </select>

        <textarea
          className="d-block m-2"
          name="description"
          rows="4"
          cols="50"
          placeholder="Add description..."
          value={task.description}
          onChange={handleChange}
        ></textarea>

        <input
          className="d-block m-2"
          type="text"
          placeholder="Assigned to..."
          name="assigned"
          value={task.assigned}
          onChange={handleChange}
        />

        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={convertDate(task.dueDate)}
          onChange={handleChange}
        />

        {errors.state && (
          <p className="m-0 text-danger">{errors.state.message}</p>
        )}
        <select
          name="state"
          type="text"
          className="d-block m-2"
          value={task.state}
          onChange={handleChange}
        >
          <option value="">State of Task...</option>
          <option value="To-Do">To-Do</option>
          <option value="Do Today">Do Today</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Done">Done</option>
        </select>

        <input type="submit" value={buttonText} />
      </form>
    </div>
  );
};

export default Form;
