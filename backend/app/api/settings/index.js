const { Router } = require("express");

const { Settings } = require("../../models");
const manageAllErrors = require("../../utils/routes/error-management");

const router = new Router();

router.get("/", (req, res) => {
  try {
    res.status(200).json(Settings.get());
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.get("/:settingsId", (req, res) => {
  try {
    res.status(200).json(Settings.getById(req.params.settingsId));
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.post("/", (req, res) => {
  try {
    const settings = Settings.create({ ...req.body });
    res.status(201).json(settings);
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.put("/:settingsId", (req, res) => {
  try {
    res.status(200).json(Settings.update(req.params.settingsId, req.body));
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.delete("/:settingsId", (req, res) => {
  try {
    Settings.delete(req.params.settingsId);
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err);
  }
});

module.exports = router;
