const { Router } = require("express");

const { Answer, Quiz, Question } = require("../../../models");
const manageAllErrors = require("../../../utils/routes/error-management");
const AnswersRouter = require("./answers");
const { filterQuestionsFromQuizz, getQuestionFromQuiz } = require("./manager");

const router = new Router({ mergeParams: true });

router.get("/", (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId);
    res.status(200).json(filterQuestionsFromQuizz(req.params.quizId));
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.get("/:questionId", (req, res) => {
  try {
    const question = getQuestionFromQuiz(
      req.params.quizId,
      req.params.questionId
    );
    res.status(200).json(question);
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.post("/", (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId);
    const quizId = parseInt(req.params.quizId, 10);
    let question = {
      question_text: req.body.question_text,
      explain_text: req.body.explain_text,
      quizId,
    };
    if (req.body.question_image) {
      question.question_image = req.body.question_image;
    }
    if (req.body.question_sound) {
      question.question_sound = req.body.question_sound;
    }
    if (req.body.explain_image) {
      question.explain_image = req.body.explain_image;
    }
    question = Question.create(question);

    // If answers have been provided in the request, we create the answer and update the response to send.
    if (req.body.answers && req.body.answers.length > 0) {
      const answers = req.body.answers.map((answer) =>
        Answer.create({ ...answer, questionId: question.id })
      );
      question = { ...question, answers };
    }
    res.status(201).json(question);
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.put("/:questionId", (req, res) => {
  try {
    res.status(200).json(Question.update(req.params.questionId, req.body));
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.delete("/:questionId", (req, res) => {
  try {
    // Check if the question id exists & if the question has the same quizId as the one provided in the url.
    getQuestionFromQuiz(req.params.quizId, req.params.questionId);
    Question.delete(req.params.questionId);
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.use("/:questionId/answers", AnswersRouter);

module.exports = router;
