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

router.post("/", (req, res) => {
  try {
    const settings = Settings.create({ ...req.body });
    res.status(201).json(settings);
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.get('/:user_id', (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id); 
    const settings = Settings.findOne({ user_id });
    res.status(200).json(settings);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put('/:user_id', (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id); 
    const settings = Settings.findOne({ user_id });;
    const result = Settings.update(settings.id, req.body);
    res.status(200).json(result)
  } catch (err) {
    manageAllErrors(res, err);
  }
});

module.exports = router;
