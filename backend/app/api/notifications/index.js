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

router.get("/:receiverId", (req, res) => {
  try {
    const receiverId = parseInt(req.params.receiverId);
    const notification = Notification.findOne({ receiverId });
    res.status(200).json(notification);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/:receiverId", (req, res) => {
  try {
    const receiverId = parseInt(req.params.receiverId);
    const notification = Notification.findOne({ receiverId });
    const result = Notification.update(notification.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    manageAllErrors(res, err);
  }
});

module.exports = router;
