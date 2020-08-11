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


module.exports = router;


