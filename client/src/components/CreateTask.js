import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();

  //set state for task model inputs
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [service, setService] = useState("");
  const [state, setState] = useState("");
  const [assigned, setAssigned] = useState("");
  const [dueDate, setDueDate] = useState("");

  //set validation errors
  const [errors, setErrors] = useState("");

  //make axios call to create new task
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/tasks", {
        name,
        color,
        description,
        service,
        state,
        assigned,
        dueDate,
      })
      .then((res) => {
        console.log(res);
        setName("");
        setColor("");
        setDescription("");
        setService("");
        setState("");
        setAssigned("");
        setDueDate("");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {errors.service && (
          <p className="m-0 text-danger">{errors.service.message}</p>
        )}
        <select
          name="service"
          type="text"
          className="d-block m-2"
          value={service}
          onChange={(e) => setService(e.target.value)}
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
          value={color}
          onChange={(e) => setColor(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          className="d-block m-2"
          type="text"
          placeholder="Assigned to..."
          name="assigned"
          value={assigned}
          onChange={(e) => setAssigned(e.target.value)}
        />

        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {errors.state && (
          <p className="m-0 text-danger">{errors.state.message}</p>
        )}
        <select
          name="state"
          type="text"
          className="d-block m-2"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">State of Task...</option>
          <option value="To-Do">To-Do</option>
          <option value="Do Today">Do Today</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Done">Done</option>
        </select>

        <input type="submit" value={"Save & Close"} />
      </form>
    </div>
  );
};

export default CreateTask;
