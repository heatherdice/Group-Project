import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Members = () => {

  // Creating State to hold the list of all members from the server.
  const [ members, setMembers ] = useState([])
  const [ singleMember, setSingleMember ] = useState({});

  // Create State to hold values for create form
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

  const viewMemberHandler = (id) => {
    axios
      .get(`http://localhost:8000/api/members/${id}`)  
      .then((res) => {
        console.log(res.data);
        setSingleMember(res.data);
        setName(res.data.name)
      })
      .catch((err) => {
        console.log(err);
      });
  }

    // Delete handler for the view member modal
    const deleteHandler = () => {
      axios
        .delete(`http://localhost:8000/api/members/${singleMember._id}`)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setSingleMember({});
          setName("");
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
  // Update handler for the update member modal
  const updateHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/members/${singleMember._id}`, { name })
      .then((res) => {
        console.log(res.data);
        setSingleMember({});
        setName("");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  // Clearing the form state when the modal is called
  const cleanUpHandler = (e) => {
    setName("");
    setErrors([]);
  };

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
        <div className="row d-flex align-items-baseline">
          <div className="col col-sm-3">
            <p className="h2">Group 5 Board</p>
          </div>
          <div className="col col-sm-1">
            <p>Members:</p>
          </div>
          <div className="col">
            { members.map((oneMember, index) => {
              return (
                // Button trigger view modal
                <button
                  key={ index }
                  type="button"
                  className="btn btn-link"
                  data-bs-toggle="modal"
                  data-bs-target="#viewMemberModal"
                  onClick={ (e) => viewMemberHandler(`${oneMember._id}`) }
                >{ oneMember.initials }</button>
              );
            })}
            {/* Button trigger create modal */}
            <button
              type="button"
              className="btn btn-link"
              data-bs-toggle="modal"
              data-bs-target="#createMemberModal"
              onClick={ cleanUpHandler }
            >
              <i className="bi bi-plus-circle-fill"></i>
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
                    <button type="button" className="btn btn-link" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={ createHandler }>Create Members</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* View modal */}
        <div
          className="modal fade"
          id="viewMemberModal"
          tabIndex="-1"
          aria-labelledby="viewMemberModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <p className="h5 modal-title" id="viewMemberModalLabel">View { name }</p>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                  <div className="mb-3">
                    <p className="form-label">Member Name</p>
                    <div className="d-flex gap-3 align-items-baseline">
                      <p className="form-control bg-light">{ name }</p>
                      {/* Button to trigger edit modal */}
                      <button
                        type="button"
                        className="btn btn-link"
                        data-bs-toggle="modal"
                        data-bs-target="#updateMemberModal"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                    </div>
                  </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-link" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-danger" onClick={ deleteHandler }>Delete { name }</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Edit modal */}
        <div
          className="modal fade"
          id="updateMemberModal"
          tabIndex="-1"
          aria-labelledby="updateMemberModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <p className="h5 modal-title" id="updateMemberModalLabel">Update { name }</p>
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
                    />
                    { errors.name ? <p className="text-danger">{ errors.name.message }</p> : null }
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-link" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={ updateHandler }>Update { name }</button>
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