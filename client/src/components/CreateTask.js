import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const CreateTask = () => {
  const navigate = useNavigate();

  //make axios call from form request
  const submitHandler = (task, setErrors) => {
    axios
      .post("http://localhost:8000/api/tasks", task)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div>
      <Form handleSubmit={submitHandler} buttonText={"Save & Close"} />
    </div>
  );
};

export default CreateTask;
