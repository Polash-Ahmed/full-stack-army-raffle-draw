require("dotenv").config();
const http = require("http");
const app = require("./app/app.js");

const server = http.createServer(app);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server litisening on port ${port}`);
});
