const express = require("express");
const posts = require("../data/db");

const router = express.Router();

router.get("/api/posts", (req, res) => {
  posts
    .find(posts)
    .then((posts) => {
      res.status(202).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not get Posts" });
    });
});

router.get("/api/posts/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((posts) => {
      if (post) {
        res.status(200).json(posts[0]);
      } else {
        res.status(404).json({
          message: "Posts not found",
        });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "The post information could not be retrieved." });
    });
});

// router.post("/api/posts", (req, res) => {
//   posts;
// });

module.exports = router;
