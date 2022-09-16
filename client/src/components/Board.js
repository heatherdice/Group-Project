import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Board = () => {
    const [tasks, setTasks] = useState([]); //Creating State to hold the list of all tasks from the server.

    // UseEffect call to get all of the Tasks from the Server.
    useEffect(() => {
        axios.get("http://localhost:8000/api/tasks")
        .then(res => {
            setTasks(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }, []);
    
    return (
        <div>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th className="column-wall">To-Do <button value="To-Do"><Link to={`/create/`}>+</Link> </button></th>
                        <th className="column-wall">Do Today <button value="Do Today">+</button></th>
                        <th className="column-wall">In Progress <button value="In-Progress">+</button></th>
                        <th className="column-wall">Done <button value="Done">+</button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="column-divider">
                        {/* To Do - Expedited Service */}
                        <td className="column-wall">(Expedited Service)
                            {tasks.filter(task => task.state === "To-Do" && task.service === "Expedited").map((task, index) =>{
                                return <div className="task" key={index}><div className={task.color}>{task.name}</div></div>
                            })}
                        </td>
                        {/* Do Today - Expedited Service */}
                        <td className="column-wall">
                            {tasks.filter(task => task.state === "Do Today" && task.service === "Expedited").map((task, index) =>{
                                return <div className="task" key={index}><div className={task.color}>{task.name}</div></div>
                            })}
                        </td>

                        {/* In Progress - Expedited Service */}
                        <td className="column-wall">
                            {tasks.filter(task => task.state === "In-Progress" && task.service === "Expedited").map((task, index) =>{
                                return <div className="task" key={index}><div className={task.color}>{task.name}</div></div>
                            })}
                        </td>

                        {/* Done - Expedited Service */}
                        <td className="column-wall">
                            {tasks.filter(task => task.state === "Done" && task.service === "Expedited").map((task, index) =>{
                                return <div className="task" key={index}><div className={task.color}>{task.name}</div></div>
                            })}
                        </td>
                    </tr>

                    <tr className="column-divider">
                        {/* To Do - Regular Service */}
                        <td className="column-wall">(Regular Service)
                            {tasks.filter(task => task.state === "To-Do" && task.service === "Regular").map((task, index) =>{
                                return <div className="task" key={index}><div className={task.color}>{task.name}</div></div>
                            })}
                        </td>

                        {/* Do Today - Regular Service */}
                        <td className="column-wall">
                            {tasks.filter(task => task.state === "Do Today" && task.service === "Regular").map((task, index) =>{
                                return <div className="task" key={index}><div className={task.color}>{task.name}</div></div>
                            })}
                        </td>

                        {/* In Progress - Regular Service */}
                        <td className="column-wall">
                            {tasks.filter(task => task.state === "In-Progress" && task.service === "Regular").map((task, index) =>{
                                return <div className="task" key={index}><div className={task.color}>{task.name}</div></div>
                            })}
                        </td>

                        {/* Done - Regular Service */}
                        <td className="column-wall">
                            {tasks.filter(task => task.state === "Done" && task.service === "Regular").map((task, index) =>{
                                return <div className="task" key={index}><div className={task.color}>{task.name}</div></div>
                            })}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default Board;