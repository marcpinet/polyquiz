const { Router } = require("express");

const { Notification } = require("../../models");
const manageAllErrors = require("../../utils/routes/error-management");

const router = new Router();

router.get("/", (req, res) => {
  try {
    res.status(200).json(Notification.get());
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.post("/", (req, res) => {
  try {
    const notification = Notification.create({ ...req.body });
    res.status(201).json(notification);
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.get("/:notificationId", (req, res) => {
  try {
    const notification = Notification.getById(req.params.notificationId);
    res.status(200).json(notification);
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.get("/user/:receiverId", (req, res) => {
  try {
    const notification = Notification.getByUserId(req.params.receiverId);
    res.status(200).json(notification);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
