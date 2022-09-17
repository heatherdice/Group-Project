import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //set state for member
  const [members, setMembers] = useState({});

  // UseEffect call to get single Member from server
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/members/${id}`)
      .then((res) => {
        setMembers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  //Filter handler to filter tasks for Member
  const filterHandler = (e) => {
    // No filter function yet
    console.log("filter");
  };

  //Edit Member handler goes to "Edit Member" component
  const editMemberClick = () => {
    navigate(`/members/editmember`);
  };

  //Delete handler to delete Member
  const deleteHandler = () => {
    axios
      .delete(`http://localhost:8000/api/members/${id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form className="card text-bg-light mb-3">
        <div className="card-header text-center">
          <label className="col-sm-8">View Member</label>
          <Link to="/" className="col-sm-4">
            X
          </Link>
        </div>
        <div className="container">
          <div className="col align-self-start card-body">
            <div className="d-inline gap-2 d-md-flex justify-content-md-start align-items-center">
              <i className="bi bi-person-circle"></i>
              <input
                className="form-control d-block m-2"
                type="text"
                name="Members"
                value={members.name}
              >
              </input>
              <i
                onClick={editMemberClick}
                className="btn bi bi-pencil-fill"
              ></i>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end m-2">
          <button className="btn btn-secondary btn-sm" onSubmit={filterHandler}>
            Filter On User
          </button>
          <button className="btn btn-danger btn-sm" onSubmit={deleteHandler}>
            Remove From Board
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewMember;
