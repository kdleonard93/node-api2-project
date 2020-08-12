const express = require("express");
const posts = require("../data/db");


const router = express.Router();

router.get("/api/posts", (req, res) => {
    posts.find(posts)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) =>{
        console.log(error);
        res.status(500).json({message: "Error Retrieving Posts"})
    })
})

router.get("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)
    .then((posts) => {
        if(posts) {
            res.status(200).json(posts[0])
        } else {
            res.status(404).json({message: "Could not retrieve Posts"})
        }
    })
    .catch((error) => {
        res.status(500).json({message: "The post information could not be retrieved."})
    })
})

router.post("/api/posts", (req, res) => {
    if(!req.body.title || !req.body.contents) {
        return res.status(400).json({errorMessage: "Please provide title and contents for the post." })
    }
    posts.insert(req.body)
    .then(({id}) => {
        posts.findById(id).then((post) =>{
        res.status(201).json(post[0])
      })
    })
    .catch((error) => {
        res.status(500).json({error: "There was an error while saving the post to the database."})
    })
})


module.exports = router;


