const express = require("express");
const db = require("../data/db");

const router = express.Router();

router.get("/", (res, req) => {
  db.find()
    .then((posts) => res.json(posts))
    .catch((error) =>
      res.status(500).json({
        message: "Posts can't be found",
      })
    );
});

router.get("/:id", (req, res) => {
  db.findByID(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

router.get("/:id/comments", (req, res) => {
  db.findCommentByID(req.params.id)
    .then((comments) => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }
  db.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });

  router.post("/:id/comments", (req, res) => {
    const userComment = req.body;
    const id = req.params.id;
    if (!userComment[id]) {
      res.status(404).json({
        message: "The post with the specified ID does not exist.",
      });
    }
    db.findByID(id)
      .then(() => {
        insertComment({
          ...userComment,
          post_id: id,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message:
            "There was an error while saving the content to the database",
        });
      });
  });

  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const comment = req.body;

    db.remove(id)
      .then((comment) => {
        if (!comment[id]) {
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        } else {
          res.status(200).json(comment);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: "The post information could not be modified.",
        });
      });
  });
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
      .then((post) => {
        if (!post) {
          status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        } else if (!changes.title || !changes.contents) {
          res.status(400).json({
            errorMessage: "Please provide title and contents for the post.",
          });
        } else {
          res.status(200).json(post);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: "The post information could not be modified.",
        });
      });
  });
});
module.exports = router;
