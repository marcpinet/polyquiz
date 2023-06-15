const { Router } = require("express");
const session = require("express-session");

const { User } = require("../../models");
const manageAllErrors = require("../../utils/routes/error-management");

const router = new Router();
const bcrypt = require("bcrypt");

const SESSION_LIFETIME = 1000 * 60 * 60 * 24 * 30; //a month
const SESSION_NAME = "login";
const SESSION_SECRET = "ps6login";

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
    //check if password changed, if yes then update with crypted password
    if (req.body.password !== undefined) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hashedPassword;
    }
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

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.status(409).json({ error: "userName doesn't exist" });
    }
    if (await bcrypt.compare(password, existingUser.password)) {
      req.session.userId = existingUser.id;
      return res.status(200).json(existingUser);
    } else {
      return res.status(200).json({ errors: "Wrong password" });
    }
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err);
  }
});

router.get("/login", async (req, res) => {
  try {
    console.log(req.session.userId);
    if (req.session.userId !== undefined) {
      const existingUser = await User.findOne({ id: req.session.userId });
      console.log(existingUser);
      return res.status(200).json(existingUser);
    }
    if (req.body.userName !== undefined) {
      const existingUser = await User.findOne({ userName: userName });
      console.log(existingUser);
      return res.status(200).json(existingUser);
    }
    return res.status(200).json({});
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err);
  }
});

router.put("/:userId/password", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = parseInt(req.params.userId);
    const existingUser = await User.findOne({ id: userId });
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "User not found" + req.params.userId });
    }
    if (await bcrypt.compare(oldPassword, existingUser.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const user = await User.update(userId, { password: hashedPassword });
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ error: "Wrong password" });
    }
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err);
  }
});

router.get("/logout", (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(200).json({ success: false });
      }
      res.clearCookie(SESSION_NAME);
      console.log("Logged out");
      return res.status(200).json({ success: true });
    });
  } catch (err) {
    manageAllErrors(res, err);
  }
});

module.exports = router;
