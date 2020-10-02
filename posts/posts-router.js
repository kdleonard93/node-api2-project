const express = require("express")
const posts = require("../data/db")

const router = express.Router()

router.get("/api/posts", (req,res) => {

    posts.find()
})

module.exports = router;

