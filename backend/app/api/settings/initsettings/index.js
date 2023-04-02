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

router.post("/", (req, res) => {
  try {
    const initSettings = InitSettings.create({ ...req.body });
    res.status(201).json(initSettings);
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.get('/:user_id', (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id); 
    const settings = InitSettings.findOne({ user_id });
    res.status(200).json(settings);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put('/:user_id', (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id); 
    const settings = InitSettings.findOne({ user_id });;
    const result = InitSettings.update(settings.id, req.body);
    res.status(200).json(result)
  } catch (err) {
    manageAllErrors(res, err);
  }
});

module.exports = router;
