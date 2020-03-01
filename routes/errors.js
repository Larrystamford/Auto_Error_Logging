var express = require("express");
let Errors = require("../models/errorsLog.model");
var router = express.Router();

/* GET users listing. */
router.route("/").get((req, res) => {
  Errors.find()
    .then(errorsLog => res.send(errorsLog))
    .catch(err => res.status(400).json("Error: " + err));
});

/* PUT error updates */
router.route("/update/:id").put((req, res) => {
  Errors.findById(req.params.id)
    .then(user => {
      user.errorCount += req.body.errorCount;
      user.errorLog.push(req.body.errorLog);
      user
        .save()
        .then(() => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

/* PUT reset errors */
router.route("/reset/:id").put((req, res) => {
  Errors.findById(req.params.id)
    .then(user => {
      user.errorCount = req.body.errorCount;
      user.errorLog = req.body.errorLog;
      // user.errorCount = 0;
      // user.errorLog = [];
      user
        .save()
        .then(() => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

/* ADD new user. */
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const department = req.body.department;
  const position = req.body.position;
  const errorCount = req.body.errorCount;
  const errorLog = req.body.errorLog;
  const newError = new Errors({
    name,
    department,
    position,
    errorCount,
    errorLog
  });
  newError
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Contacts.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
