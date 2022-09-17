import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Members = () => {

  // Creating State to hold the list of all members from the server.
  const [members, setMembers] = useState([])

  // Create State to hold values for forms
  const [ name, setName ] = useState("");
  const [ errors, setErrors ] = useState([]);

  // UseEffect call to get all of the Members from the Server.
  useEffect(() => {
    axios.get("http://localhost:8000/api/members")
    .then(res => {
      setMembers(res.data)
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }, []);

  // Clearing the form state when the modal is called
  const cleanUpHandler = (e) => {
    setName("");
    setErrors([]);
  }

  // Submit handler for the create member modal
  const createHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/members", { name })
      .then((res) => {
        console.log(res.data);
        setName("");
        setErrors([]);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  }

    return (
      <div className="container">
        <div className="row">
          <div className="col col-sm-3">
            <p className="h2">Group 5 Board</p>
          </div>
          <div className="col col-sm-9">
            { members.map((oneMember, index) => {
              return (
                <Link key={ index } className="m-1" to={ `/member/${ oneMember._id}` }>{ oneMember.initials }</Link>
              );
            })}
            {/* Button trigger create modal */}
            <button
              type="button"
              className="member-add"
              data-bs-toggle="modal"
              data-bs-target="#createMemberModal"
              onClick={ cleanUpHandler }
            >
              +
            </button>
          </div>
        </div>
        {/* Create modal */}
        <div
          className="modal fade"
          id="createMemberModal"
          tabIndex="-1"
          aria-labelledby="createMemberModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <p className="h5 modal-title" id="createMemberModalLabel">Create Members</p>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="member-name" className="col-form-label">Member Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="member-name"
                      onChange={ (e) => setName(e.target.value) }
                      name="name"
                      value={ name }
                      placeholder="Enter team member name"
                    />
                    { errors.name ? <p className="text-danger">{ errors.name.message }</p> : null }
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-link" data-bs-dismiss="modal">Done Creating Member</button>
                    <button type="submit" className="btn btn-primary" onClick={ createHandler }>Create Members</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

};

export default Members;