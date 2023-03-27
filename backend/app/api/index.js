const { Router } = require('express')
const UserRouter = require('./users')
const ResidentRouter = require('./users/residents')
const QuizzesRouter = require('./quizzes')
const ThemeRouter = require('./themes')
const router = new Router()

const fs = require("fs");
const multipart = require('connect-multiparty');
var path = require('path');
const { Quiz } = require('../models');
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});
router.get('/uploads/:fileName', (req, res) => {

  var file = path.resolve(__dirname+'/../../uploads/'+req.params.fileName)
  if (fs.existsSync(file)) {
    res.sendFile(file);
  }else {
    res.status(404)
  }
})

router.post('/upload', multipartMiddleware, (req, res) => {
    if(req.files.uploads[0] !== undefined) {
      var file = req.files.uploads[0].path;
      var newFile = file.split("/").pop();
      res.json({
        'filepath': file
      });
    }
});

router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/users', UserRouter)
router.use('/residents', ResidentRouter )
router.use('/quizzes', QuizzesRouter)
router.use('/themes', ThemeRouter)
module.exports = router
