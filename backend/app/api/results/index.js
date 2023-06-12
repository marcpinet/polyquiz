const { Router } = require("express");
const { Result } = require("../../models");
const manageAllErrors = require("../../utils/routes/error-management");
const { buildResults } = require("./manager");

const router = new Router();

router.get("/", (req, res) => {
  try {
    const results = buildResults();
    res.status(200).json(results);
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.get("/:resultId", (req, res) => {
  try {
    res.status(200).json(Result.getById(req.params.resultId));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/quiz/:quizId", (req, res) => {
  try {
    res.status(200).json(Result.getByQuizId(req.params.quizId));
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/user/:userId", (req, res) => {
  try {
    res.status(200).json(Result.getByUserId(req.params.userId));
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/quiz/:quizId", (req, res) => {
  try {
    res.status(200).json(Result.getByQuizId(req.params.quizId));
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    //TODO: Update future stats here
    const quiz = await Result.create({ ...req.body });
    res.status(201).json(quiz);
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err);
  }
});

module.exports = router;
