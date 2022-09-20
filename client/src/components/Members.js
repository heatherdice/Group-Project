import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bunSuccess from '../assets/bunSuccess.png';

const Members = () => {

  // Creating State to hold the list of all members from the server.
  const [ members, setMembers ] = useState([]);
  const [ singleMember, setSingleMember ] = useState({});

  // Create State to hold values for create form
  const [ name, setName ] = useState("");

  // Create State to hold form validation errors
  const [ tooShort, setTooShort ] = useState("Name must be at least 3 characters long");
  const [ tooLong, setTooLong ] = useState("Name must be at most 255 characters long");
  const [ nonLetters, setNonLetters ] = useState("Name must not contain numbers or special characters");
  const [ longSpaces, setLongSpaces ] = useState("Name must not contain multiple sequential spaces");

  // Specific state to trigger the useEffect on
  const [ refreshRequired, setRefreshRequired ] = useState(false);

  // UseEffect call to get all of the Members from the Server.
  useEffect(() => {
    axios.get("http://localhost:8000/api/members")
    .then(res => {
      setMembers(res.data);
      console.log(res.data);
      setRefreshRequired(false);
    })
    .catch(err => console.log(err))
  }, [refreshRequired]);

  //  // Validating that the name entered conforms to standards  
    const validateName = () => {
    setTooShort("");
    setTooLong("");
    setNonLetters("");
    setLongSpaces("");
    if (name.length < 3) {
      setTooShort("Name must be at least 3 characters long" );
    }
    if (name.length > 255) {
      setTooLong("Name must be at most 255 characters long");
    }
    if (!/^[a-z\d\-_\s]+$/i.test(name)) {
      setNonLetters("Name must not contain numbers or special characters");
    }
    if (/  +/g.test(name)) {
      setLongSpaces("Name must not contain multiple sequential spaces");
    }
  };

  const viewMemberHandler = (id) => {
    setTooShort("Name must be at least 3 characters long");
    setTooLong("Name must be at most 255 characters long");
    setNonLetters("Name must not contain numbers or special characters");
    setLongSpaces("Name must not contain multiple sequential spaces");
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
          setRefreshRequired(true);
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
        setRefreshRequired(true);
        setTooShort("Name must be at least 3 characters long");
        setTooLong("Name must be at most 255 characters long");
        setNonLetters("Name must not contain numbers or special characters");
        setLongSpaces("Name must not contain multiple sequential spaces");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
      });
  };

  // Clearing the form state when the create modal is called
  const cleanUpHandler = (e) => {
    setSingleMember({});
    setName("");
    setTooShort("Name must be at least 3 characters long");
    setTooLong("Name must be at most 255 characters long");
    setNonLetters("Name must not contain numbers or special characters");
    setLongSpaces("Name must not contain multiple sequential spaces");
  };

  // Submit handler for the create member modal
  const createHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/members", { name })
      .then((res) => {
        console.log(res.data);
        setName("");
        setRefreshRequired(true);
        setTooShort("Name must be at least 3 characters long");
        setTooLong("Name must be at most 255 characters long");
        setNonLetters("Name must not contain numbers or special characters");
        setLongSpaces("Name must not contain multiple sequential spaces");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
      });
  }

    return (
      <div className="container">
        <div className="row d-flex align-items-baseline mb-3">
          <div className="col-auto fw-bold">Members:</div>
          <div className="col">
            { members.map((oneMember, index) => {
              return (
                // Button trigger view modal
                <button
                  key={ index }
                  type="button"
                  className="btn btn-outline-dark btn-circle"
                  data-bs-toggle="modal"
                  data-bs-target="#viewMemberModal"
                  onClick={ (e) => viewMemberHandler(`${oneMember._id}`) }
                >
                  { oneMember.name.match(/\b([A-Za-z0-9])/g).join('').toUpperCase() }
                </button>
              );
            })}
            {/* Button trigger create modal */}
            <img
              src={ bunSuccess }
              alt="Green CinnaKanban"
              className="bun-circle"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#createMemberModal"
              onClick={ cleanUpHandler }
            />
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
                    <div className="d-flex gap-3 align-items-baseline">
                      <input
                        type="text"
                        className="form-control"
                        id="member-name"
                        onChange={ (e) => setName(e.target.value) }
                        name="name"
                        value={ name }
                        placeholder="Enter team member name"
                      />
                      {/* Button to trigger the name validation */}
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={ validateName }
                      >
                        Validate
                      </button>
                    </div>
                    {
                      tooShort ?
                      <div className="text-info">{ tooShort }</div> :
                      null
                    }
                    {
                      tooLong ?
                      <div className="text-info">{ tooLong }</div> :
                      null
                    }
                    {
                      nonLetters ?
                      <div className="text-info">{ nonLetters }</div> :
                      null
                    }
                    {
                      longSpaces ?
                      <div className="text-info">{ longSpaces }</div> :
                      null
                    }
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-link" data-bs-dismiss="modal">Close</button>
                    {
                      tooShort || tooLong || nonLetters || longSpaces ?
                      <p><button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={ createHandler } disabled>Create Members</button></p> :
                      <p><button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={ createHandler }>Create Members</button></p>
                    }
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
                        className="btn btn-info"
                        data-bs-toggle="modal"
                        data-bs-target="#updateMemberModal"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-link" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-danger" data-bs-dismiss="modal" onClick={ deleteHandler }>Delete { name }</button>
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
                    <div className="d-flex gap-3 align-items-baseline">
                      <input
                        type="text"
                        className="form-control"
                        id="member-name"
                        onChange={ (e) => setName(e.target.value) }
                        name="name"
                        value={ name }
                      />
                      {/* Button to trigger the name validation */}
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={ validateName }
                      >
                        Validate
                      </button>
                    </div>
                    {
                      tooShort ?
                      <div className="text-info">{ tooShort }</div> :
                      null
                    }
                    {
                      tooLong ?
                      <div className="text-info">{ tooLong }</div> :
                      null
                    }
                    {
                      nonLetters ?
                      <div className="text-info">{ nonLetters }</div> :
                      null
                    }
                    {
                      longSpaces ?
                      <div className="text-info">{ longSpaces }</div> :
                      null
                    }
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-link" data-bs-dismiss="modal">Close</button>
                    {
                      tooShort || tooLong || nonLetters || longSpaces ?
                      <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={ updateHandler } disabled>Update { name }</button> :
                      <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={ updateHandler }>Update { name }</button>
                    }
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