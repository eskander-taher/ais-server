const app = require("./app");
const PORT = 5000;

const server = app();

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
