const express = require("express");
const cors = require("cors");
const swagger = require("./docs/swagger");

function createApp() {
  // Express app setup: Enable CORS, parse requests
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Resources routes
  app.use("/api/users", require("./api/users/userRoutes"));

  swagger(app);
  return app;
}

module.exports = createApp;
