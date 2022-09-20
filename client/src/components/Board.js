import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bunPrimary from '../assets/bunPrimary.png';

const Board = (props) => {
    
    //Lifting button state up to App to pass down to Create
    const { buttonState, setButtonState } = props;
    
    const [tasks, setTasks] = useState([]); //Creating State to hold the list of all tasks from the server. (filtered)
    const [members, setMembers] = useState([]) // State to hold the members

    const [memberFilter, setMemberFilter] = useState("All") // Creating state to hold the Member Filter value
    const [colorFilter, setColorFilter] = useState("All") // Creating state to hold the Color Filter value

    const [fullTasks, setFullTasks] = useState([]) // State to hold the FULL list of unfiltered Tasks.

    const navigate = useNavigate(); //Setting up Navigate

    // UseEffect call to get all of the Tasks from the Server.
    useEffect(() => {
        axios.get("http://localhost:8000/api/tasks")
        .then(res => {
            setFullTasks(res.data)
            setMemberFilter("All")
            setColorFilter("All")
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }, []);

    //UseEffect to filter down the Tasks by Color and member
    useEffect(() => {
        if (colorFilter === "All" && memberFilter === "All") {
            setTasks(fullTasks);
        } else if (colorFilter !== "All" && memberFilter !== "All") {
            setTasks(fullTasks.filter(tasks => tasks.color === colorFilter && tasks.assignedRef._id === memberFilter));
        } else if (colorFilter !== "All" && memberFilter === "All") {
            setTasks(fullTasks.filter(tasks => tasks.color === colorFilter));
        } else if (colorFilter === "All" && memberFilter !== "All") {
            setTasks(fullTasks.filter(tasks => tasks.assignedRef._id === memberFilter));
        } else {
            setTasks([]);
        }
    },[fullTasks, colorFilter, memberFilter]);

    
    // UseEffect call to get all of the Members from the Server.
    useEffect(() => {
        axios.get("http://localhost:8000/api/members")
        .then(res => {
            setMembers(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }, [members]);

    const createFormHandler = (status) => {
        setButtonState(status);
        navigate("/task/create");
    };
    
    return (
        <>
            <div className="border border-dark rounded shadow mb-2 bg-white p-3">
                <form>
                    <div className="row">
                        <div className="col d-flex align-items-center gap-2">
                            <div className="col-auto">
                                <label className="fw-bold">Filter by Color:</label>
                            </div>
                            <div className="col">
                                <select className="form-select" onChange = {(e)=>setColorFilter(e.target.value)}>
                                    <option value="All">All</option>
                                    <option value="Yellow">Yellow</option>
                                    <option value="Red">Red</option>
                                    <option value="Orange">Orange</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Purple">Purple</option>
                                    <option value="Green">Green</option>
                                </select>
                            </div>
                        </div>
                        <div className="col d-flex align-items-center gap-2">
                            <div className="col-auto">
                                <label className="fw-bold">Filter by Member:</label>
                            </div>
                            <div className="col">
                                <select className="form-select" onChange = {(e)=>setMemberFilter(e.target.value)}>
                                    <option value="All">All</option>
                                    {
                                        members.filter(members => members.active === true).map((oneMember, index) => {
                                        return (
                                            <option key={index} value={oneMember._id}>{oneMember.name}</option>
                                        )})
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="border border-dark rounded shadow bg-white p-3 table-responsive">
                <table className="table table-sm table-borderless">
                    <thead>
                        <tr>
                            <th className="col-3" scope="col">To-Do
                                <img 
                                    src={ bunPrimary }
                                    alt="Blue CinnaKanban"
                                    className="bun-circle"
                                    type="button"
                                    onClick={ (e) => createFormHandler('To-Do') }
                                />
                            </th>
                            <th className="col-3" scope="col">Do Today
                                <img 
                                    src={ bunPrimary }
                                    alt="Blue CinnaKanban"
                                    className="bun-circle"
                                    type="button"
                                    onClick={ (e) => createFormHandler('Do Today') }
                                />
                            </th>
                            <th className="col-3" scope="col">In-Progress
                                <img 
                                    src={ bunPrimary }
                                    alt="Blue CinnaKanban"
                                    className="bun-circle"
                                    type="button"
                                    onClick={ (e) => createFormHandler('In-Progress') }
                                />
                            </th>
                            <th className="col-3" scope="col">Done
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
                        <tr id="expedited-service">
                            {/* To Do - Expedited Service */}
                            <td>(Expedited Service)
                                {tasks.filter(task => task.state === "To-Do" && task.service === "Expedited").map((task, index) =>{
                                    return (
                                        <div className={`${ task.color } d-flex justify-content-between mb-2 rounded p-2 task`} key={ index } onClick={ () => navigate(`/task/${task._id}`) }>
                                            <div className="text-truncate">
                                                { task.name }
                                            </div>
                                            <div className="fw-bold">
                                                { task.assignedRef.name.match(/\b([A-Za-z0-9])/g).join('').toUpperCase() }
                                            </div>
                                        </div>
                                    )
                                })}
                            </td>
                            {/* Do Today - Expedited Service */}
                            <td>
                                {tasks.filter(task => task.state === "Do Today" && task.service === "Expedited").map((task, index) =>{
                                    return (
                                        <div className={`${ task.color } d-flex justify-content-between mb-2 rounded p-2 task`} key={ index } onClick={ () => navigate(`/task/${task._id}`) }>
                                            <div className="text-truncate">
                                                { task.name }
                                            </div>
                                            <div className="fw-bold">
                                                { task.assignedRef.name.match(/\b([A-Za-z0-9])/g).join('').toUpperCase() }
                                            </div>
                                        </div>
                                    )
                                })}
                            </td>
                            {/* In Progress - Expedited Service */}
                            <td>
                                {tasks.filter(task => task.state === "In-Progress" && task.service === "Expedited").map((task, index) =>{
                                    return (
                                        <div className={`${ task.color } d-flex justify-content-between mb-2 rounded p-2 task`} key={ index } onClick={ () => navigate(`/task/${task._id}`) }>
                                            <div className="text-truncate">
                                                { task.name }
                                            </div>
                                            <div className="fw-bold">
                                                { task.assignedRef.name.match(/\b([A-Za-z0-9])/g).join('').toUpperCase() }
                                            </div>
                                        </div>
                                    )
                                })}
                            </td>
                            {/* Done - Expedited Service */}
                            <td>
                                {tasks.filter(task => task.state === "Done" && task.service === "Expedited").map((task, index) =>{
                                    return (
                                        <div className={`${ task.color } d-flex justify-content-between mb-2 rounded p-2 task`} key={ index } onClick={ () => navigate(`/task/${task._id}`) }>
                                            <div className="text-truncate">
                                                { task.name }
                                            </div>
                                            <div className="fw-bold">
                                                { task.assignedRef.name.match(/\b([A-Za-z0-9])/g).join('').toUpperCase() }
                                            </div>
                                        </div>
                                    )
                                })}
                            </td>
                        </tr>
                        <tr id="regular-service">
                            {/* To Do - Regular Service */}
                            <td>(Regular Service)
                                {tasks.filter(task => task.state === "To-Do" && task.service === "Regular").map((task, index) =>{
                                    return (
                                        <div className={`${ task.color } d-flex justify-content-between mb-2 rounded p-2 task`} key={ index } onClick={ () => navigate(`/task/${task._id}`) }>
                                            <div className="text-truncate">
                                                { task.name }
                                            </div>
                                            <div className="fw-bold">
                                                { task.assignedRef.name.match(/\b([A-Za-z0-9])/g).join('').toUpperCase() }
                                            </div>
                                        </div>
                                    )
                                })}
                            </td>
                            {/* Do Today - Regular Service */}
                            <td>
                                {tasks.filter(task => task.state === "Do Today" && task.service === "Regular").map((task, index) =>{
                                    return (
                                        <div className={`${ task.color } d-flex justify-content-between mb-2 rounded p-2 task`} key={ index } onClick={ () => navigate(`/task/${task._id}`) }>
                                            <div className="text-truncate">
                                                { task.name }
                                            </div>
                                            <div className="fw-bold">
                                                { task.assignedRef.name.match(/\b([A-Za-z0-9])/g).join('').toUpperCase() }
                                            </div>
                                        </div>
                                    )
                                })}
                            </td>
                            {/* In Progress - Regular Service */}
                            <td>
                                {tasks.filter(task => task.state === "In-Progress" && task.service === "Regular").map((task, index) =>{
                                    return (
                                        <div className={`${ task.color } d-flex justify-content-between mb-2 rounded p-2 task`} key={ index } onClick={ () => navigate(`/task/${task._id}`) }>
                                            <div className="text-truncate">
                                                { task.name }
                                            </div>
                                            <div className="fw-bold">
                                                { task.assignedRef.name.match(/\b([A-Za-z0-9])/g).join('').toUpperCase() }
                                            </div>
                                        </div>
                                    )
                                })}
                            </td>
                            {/* Done - Regular Service */}
                            <td>
                                {tasks.filter(task => task.state === "Done" && task.service === "Regular").map((task, index) =>{
                                    return (
                                        <div className={`${ task.color } d-flex justify-content-between mb-2 rounded p-2 task`} key={ index } onClick={ () => navigate(`/task/${task._id}`) }>
                                            <div className="text-truncate">
                                                { task.name }
                                            </div>
                                            <div className="fw-bold">
                                                { task.assignedRef.name.match(/\b([A-Za-z0-9])/g).join('').toUpperCase() }
                                            </div>
                                        </div>
                                    )
                                })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Board;