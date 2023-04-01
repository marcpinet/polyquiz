const { Router } = require("express");

const { InitSettings } = require("../../../models");
const manageAllErrors = require("../../../utils/routes/error-management");

const router = new Router();

router.get("/", (req, res) => {
  try {
    res.status(200).json(InitSettings.get());
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.get("/:settingsId", (req, res) => {
  try {
    res.status(200).json(InitSettings.getById(req.params.settingsId));
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.post("/", (req, res) => {
  try {
    const initSettings = InitSettings.create({ ...req.body });
    res.status(201).json(initSettings);
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.put("/:settingsId", (req, res) => {
  try {
    res.status(200).json(InitSettings.update(req.params.settingsId, req.body));
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.delete("/:settingsId", (req, res) => {
  try {
    InitSettings.delete(req.params.settingsId);
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err);
  }
});

module.exports = router;
