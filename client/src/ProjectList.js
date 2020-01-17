import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000")
      .then(res => {
        setProjects(res.data);
        console.log("res", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>List of all Projects</h1>
      {projects.map(project => (
        <div>
          <Link to={`/${project.id}/actions`}>
            <button>{project.name}</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
