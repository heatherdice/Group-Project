import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const CreateTask = (props) => {
  
  // Pulling down task status / status value from Board to pass to Form
  const { buttonState, setButtonState } = props;

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
      <Form handleSubmit={submitHandler} buttonText={"Save & Close"} buttonState={ buttonState } setButtonState={ setButtonState } />
    </div>
  );
};

export default CreateTask;
