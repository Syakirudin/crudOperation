// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", customerRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
