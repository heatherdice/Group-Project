import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Board = () => {
    const [tasks, setTasks] = useState([]); //Creating State to hold the list of all tasks from the server.

    useEffect(() => {
        axios.get("http://localhost:8000/api/tasks")
        .then(res => setTasks(res.data))
        .catch(err => console.log(err))
    }, []);
    
    return (
        <div>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th className="column-wall">To-Do</th>
                        <th className="column-wall">Do Today</th>
                        <th className="column-wall">In Progress</th>
                        <th className="column-wall">Done</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="column-divider">
                        <td className="column-wall">(Expedited Service)
                            {
                                tasks.map((task, index) =>{
                                    return <div className="task" key={index}><div className={task.color}>{task.name}</div></div>
                                })
                            }
                        </td>
                        <td className="column-wall"></td>
                        <td className="column-wall"></td>
                        <td className="column-wall"></td>
                    </tr>
                    <tr className="column-divider">
                        <td className="column-wall">(Regular Service)</td>
                        <td className="column-wall"></td>
                        <td className="column-wall"></td>
                        <td className="column-wall"></td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default Board;