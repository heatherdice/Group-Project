import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Members = () => {

  // Creating State to hold the list of all members from the server.
  const [members, setMembers] = useState([])

  // UseEffect call to get all of the Members from the Server.
  useEffect(() => {
    axios.get("http://localhost:8000/api/members")
    .then(res => {
      setMembers(res.data)
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }, []);

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
            <Link className="no-underline" to=""><button className="member-add">+</button></Link>
          </div>
        </div>
      </div>
    );

};

export default Members;