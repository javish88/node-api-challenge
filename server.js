const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const projectRouter = require("./projects/projectRouter");
const actionRouter = require("./actions/actionRouter");
const db = require("./data/helpers/projectModel");

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(logger);
server.use("/", projectRouter);
server.use("/:id/actions", actionRouter);

server.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error getting the projects" });
    });
});

// Custom MiddleWare

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next();
}

module.exports = server;
