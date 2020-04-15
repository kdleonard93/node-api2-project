const express = require("express");

const postsRouter = require("./router.js");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`BLOG`);
});

server.listen(4000, () => {
  console.log("Server Running on http://localhost:4000");
});
