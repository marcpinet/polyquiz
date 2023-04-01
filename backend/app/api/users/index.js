const { Router } = require("express");
const session = require("express-session");

const { User } = require("../../models");
const manageAllErrors = require("../../utils/routes/error-management");

const router = new Router();
const bcrypt = require("bcrypt");

const SESSION_LIFETIME = 1000 * 60 * 60 * 24 * 30; //a month
const SESSION_NAME = "login";
const SESSION_SECRET = "ps6 login";

var FileStore = require("session-file-store")(session);

const isConnected = (req) => {
  return req.session.userId !== undefined;
};

router.get("/", (req, res) => {
  try {
    res.status(200).json(User.get());
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.use(function (req, res, next) {
  //CORS control
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

router.use(
  session({
    store: new FileStore({}),
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: SESSION_LIFETIME,
      secure: false,
      sameSite: true,
    },
  })
);

router.post("/", async (req, res) => {
  try {
    const { userName, password, avatar } = req.body;
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    //TODO: avatar upload control here
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      ...req.body,
      userName: userName,
      password: hashedPassword,
      avatar: avatar,
    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err);
  }
});

router.put("/:userId", (req, res) => {
  try {
    res.status(200).json(User.update(req.params.userId, req.body));
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err);
  }
});

router.delete("/:userId", (req, res) => {
  try {
    User.delete(req.params.userId);
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err);
  }
});

module.exports = router;
