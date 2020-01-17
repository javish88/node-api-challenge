const express = require("express");
const db = require("../data/helpers/projectModel");

const router = express.Router();

router.post("/", (req, res) => {
  db.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error adding the project" });
    });
});

router.put("/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "The project could not be found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error updating project" });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "DELETE DELETE DELETE" });
      } else {
        res.status(404).json({ message: "The project could not be found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error deleting the project" });
    });
});

router.get("/:id/actions", (req, res) => {
  db.getProjectActions(req.params.id)
    .then(actions => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "No actions found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving actions" });
    });
});

module.exports = router;
