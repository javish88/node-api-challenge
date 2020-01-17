import React, { useState, useEffect } from "react";
import axios from "axios";

function Project(props) {
  const [actions, setActions] = useState([]);
  const id = props.match.params.id;
  console.log(actions);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/${id}/actions`)
      .then(res => {
        setActions(res.data);
        console.log("actions", res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div>
      <h1>Project's Actions</h1>
      {actions.map(action => (
        <div className="actions">
          <p>{action.description}</p>
          <p>{action.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default Project;
