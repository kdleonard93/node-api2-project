const express = require("express");
const db = require("./data/db");
const expressRouter = require("./express/express-router");

const server = express();
const port = 4000;

server.use(express.json());
server.use("/", expressRouter);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
