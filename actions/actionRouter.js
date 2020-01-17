const express = require("express");
const db = require("../data/helpers/actionModel");

const router = express.Router();

router.post("/", (req, res) => {
  db.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error adding action" });
    });
});

router.put("/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "No action found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error updating action" });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "DELETE DELETE DELETE" });
      } else {
        res.status(404).json({ message: "The action could not be found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error removing the action" });
    });
});

module.exports = router;
