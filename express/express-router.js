const express = require("express");
const db = require("../data/db");

const router = express.Router();

router.get("/", (res, req) => {
  db.find()
    .then(posts => res.json(posts))
    .catch(error =>
      res.status(500).json({
        message: "Posts can't be found"
      })
    );
});

router.get("/:id", (req, res) => {
  posts
    .findByID(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

module.exports = router;
