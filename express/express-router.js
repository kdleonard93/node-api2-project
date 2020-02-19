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

router.get("/:id/comments", (req, res) => {
  posts
    .findCommentByID(req.params.id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  posts
    .insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });

  router.post("/:id/comments", (req, res) => {
    const userComment = req.body;
    const id = req.params.id;
    if (!userComment(id)) {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  });
});

module.exports = router;
