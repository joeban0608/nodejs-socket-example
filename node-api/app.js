const express = require("express");
const bodyParser = require("body-parser");
const postRouter = require("./routes/post");

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   console.log("Some middleware!");
//   next();
// });
app.use((req, res, next) => {
  // res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(postRouter);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
