import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [ message, setMessage ] = useState("Loading...");
  useEffect(() => {
    axios.get("http://localhost:8000/api")
      .then(res => setMessage(res.data.message))
      .catch(err => console.log(err))
  }, []);
  return (
    <div>
      <h2>Message from the backend: { message }</h2>
    </div>
  )
}
export default Home;