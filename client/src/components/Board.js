import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import bunPrimary from '../assets/bunPrimary.png';

const Board = (props) => {
    
    //Lifting button state up to App to pass down to Create
    const { buttonState, setButtonState } = props;
    
    const [tasks, setTasks] = useState([]); //Creating State to hold the list of all tasks from the server.
    const [members, setMembers] = useState([]) // State to hold the members

    const [memberFilter, setMemberFilter] = useState("") // Creating state to hold the Member Filter value
    const [colorFilter, setColorFilter] = useState("") // Creating state to hold the Color Filter value

    const navigate = useNavigate(); //Setting up Navigate

    // UseEffect call to get all of the Tasks from the Server.
    useEffect(() => {
        axios.get("http://localhost:8000/api/tasks")
        .then(res => {
            setTasks(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }, []);

    // UseEffect call to get all of the Members from the Server.
    useEffect(() => {
        axios.get("http://localhost:8000/api/members")
        .then(res => {
            setMembers(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }, []);

    const createFormHandler = (status) => {
        setButtonState(status);
        navigate("/task/create");
    };
    
    return (
        <div className="container">
            <div>
                <form>
                    <select onChange = {(e)=>setColorFilter(e.target.value)}>
                    
                        <option value="All">All</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Red">Red</option>
                        <option value="Orange">Orange</option>
                        <option value="Blue">Blue</option>
                        <option value="Purple">Purple</option>
                        <option value="Green">Green</option>
                    </select>
                </form>
                <form>
                    <select onChange = {(e)=>setMemberFilter(e.target.value)}>
                        <option value="All">All</option>
                        { members.map((oneMember, index) => {
                            return (
                            <option key={index} value={oneMember._id}>{oneMember.name}</option>
                            ) })}
                    </select>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="column-wall">To-Do
                                <img 
                                    src={ bunPrimary }
                                    alt="Blue CinnaKanban"
                                    className="bun-circle"
                                    type="button"
                                    onClick={ (e) => createFormHandler('To-Do') }
                                />
                            </th>
                            <th className="column-wall">Do Today
                                <img 
                                    src={ bunPrimary }
                                    alt="Blue CinnaKanban"
                                    className="bun-circle"
                                    type="button"
                                    onClick={ (e) => createFormHandler('Do Today') }
                                />
                            </th>
                            <th className="column-wall">In-Progress
                                <img 
                                    src={ bunPrimary }
                                    alt="Blue CinnaKanban"
                                    className="bun-circle"
                                    type="button"
                                    onClick={ (e) => createFormHandler('In-Progress') }
                                />
                            </th>
                            <th className="column-wall">Done
                                <img 
                                    src={ bunPrimary }
                                    alt="Blue CinnaKanban"
                                    className="bun-circle"
                                    type="button"
                                    onClick={ (e) => createFormHandler('Done') }
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="column-divider">
                            {/* To Do - Expedited Service */}
                            <td className="column-wall">(Expedited Service)
                                {tasks.filter(task => task.state === "To-Do" && task.service === "Expedited").map((task, index) =>{
                                    return <div className="task" key={index}>
                                        <div>
                                            <Link className="no-underline" to={`/task/${task._id}`}>
                                                <div className={`${task.color} task-card no-underline`}>{task.name}</div>
                                            </Link>
                                        </div>
                                        <div>
                                            {/* <button
                                                className="btn btn-outline-dark btn-circle"
                                            >
                                                { task.assignedRef.name.match(/\b([A-Za-z0-9])/g).join('').toUpperCase() }
                                            </button> */}
                                        </div>
                                        </div>
                                })}
                            </td>
                            {/* Do Today - Expedited Service */}
                            <td className="column-wall">
                                {tasks.filter(task => task.state === "Do Today" && task.service === "Expedited").map((task, index) =>{
                                    return <div className="task" key={index}>
                                        <Link className="no-underline" to={`/task/${task._id}`}><div className={`${task.color} task-card`}>{task.name}</div></Link></div>
                                })}
                            </td>

                            {/* In Progress - Expedited Service */}
                            <td className="column-wall">
                                {tasks.filter(task => task.state === "In-Progress" && task.service === "Expedited").map((task, index) =>{
                                    return <div className="task" key={index}>
                                        <Link className="no-underline" to={`/task/${task._id}`}><div className={`${task.color} task-card`}>{task.name}</div></Link></div>
                                })}
                            </td>

                            {/* Done - Expedited Service */}
                            <td className="column-wall">
                                {tasks.filter(task => task.state === "Done" && task.service === "Expedited").map((task, index) =>{
                                    return <div className="task" key={index}>
                                        <Link className="no-underline" to={`/task/${task._id}`}><div className={`${task.color} task-card`}>{task.name}</div></Link></div>
                                })}
                            </td>
                        </tr>

                        <tr className="column-divider">
                            {/* To Do - Regular Service */}
                            <td className="column-wall">(Regular Service)
                                {tasks.filter(task => task.state === "To-Do" && task.service === "Regular").map((task, index) =>{
                                    return <div className="task" key={index}>
                                        <Link className="no-underline" to={`/task/${task._id}`}><div className={`${task.color} task-card`}>{task.name}</div></Link></div>
                                })}
                            </td>

                            {/* Do Today - Regular Service */}
                            <td className="column-wall">
                                {tasks.filter(task => task.state === "Do Today" && task.service === "Regular").map((task, index) =>{
                                    return <div className="task" key={index}>
                                        <Link className="no-underline" to={`/task/${task._id}`}><div className={`${task.color} task-card`}>{task.name}</div></Link></div>
                                })}
                            </td>

                            {/* In Progress - Regular Service */}
                            <td className="column-wall">
                                {tasks.filter(task => task.state === "In-Progress" && task.service === "Regular").map((task, index) =>{
                                    return <div className="task" key={index}>
                                        <Link className="no-underline" to={`/task/${task._id}`}><div className={`${task.color} task-card`}>{task.name}</div></Link></div>
                                })}
                            </td>

                            {/* Done - Regular Service */}
                            <td className="column-wall">
                                {tasks.filter(task => task.state === "Done" && task.service === "Regular").map((task, index) =>{
                                    return <div className="task" key={index}>
                                        <Link className="no-underline" to={`/task/${task._id}`}><div className={`${task.color} task-card`}>{task.name}</div></Link></div>
                                })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Board;