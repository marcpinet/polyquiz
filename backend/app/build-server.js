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
  app.use(cors({ credentials: true, origin: "http://localhost:4200" }));

  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
  });
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
