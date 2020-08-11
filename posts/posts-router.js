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
            res.status(200).json(posts)
        } else {
            res.status(404).json({message: "Could not retrieve Posts"})
        }
    })
    .catch((error) => {
        res.status(500).json({message: "The post information could not be retrieved."})
    })
})


module.exports = router;


