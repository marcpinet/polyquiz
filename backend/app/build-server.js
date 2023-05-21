const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const api = require("./api");

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
};

module.exports = (cb) => {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors(corsOptions));
  app.use(bodyParser.json({}));
  app.use(
    morgan(
      "[:date[iso]] :method :url :status :response-time ms - :res[content-length]"
    )
  );
  app.use("/api", api);
  app.use("*", (req, res) => res.status(404).end());
  const server = app.listen(process.env.PORT || 9428, () => cb && cb(server));
};
