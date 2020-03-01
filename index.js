const express = require("express");
const app = express();
const Joi = require("joi");
var cors = require("cors");
var mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

var errorRoute = require("./routes/errors");

// security breach
mongoose.connect(
  "mongodb+srv://larrylee3107:90points!@cluster0-1occf.mongodb.net/GrabErrors?retryWrites=true&w=majority",
  { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

app.use("/api/errors", errorRoute);

// models is database
// routes is routing
// control is class/functional logic

const contacts = [
  { id: 1, name: "larry" },
  { id: 2, name: "kenny" },
  { id: 3, name: "rachel" }
];

app.get("/", (req, res) => {
  res.send("hello grab");
});

app.get("/contacts/", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/contacts/:firstName/:lastName", (req, res) => {
  firstName = req.params.firstName;
  lastName = req.params.lastName;

  // query /contacts/larry?sortBy=name
  query = req.query;
  res.send(firstName);
});

app.get("/contacts/:firstName", (req, res) => {
  const contact = contacts.find(
    eachContact => eachContact.name === req.params.firstName
  );
  if (!contact) {
    res.status(404).send("User not found");
  }
  res.send(contact);
});

//POST
app.post("/contacts", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error);
  }

  const newContact = {
    id: contacts.length + 1,
    name: req.body.name
  };
  contacts.push(newContact);
  res.send(contacts);
});

//PUT
app.put("/contacts/:firstName", (req, res) => {
  // check if contact exist for update
  const contact = contacts.find(
    eachContact => eachContact.name === req.params.firstName
  );
  if (!contact) {
    res.status(404).send("User not found");
  }
  // check if update body is valid
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);
  // destructuring example to replace result.error
  // const {error} = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error);
  }
  // return
  contact.name = req.body.name;
  res.send(contact);
});

//DELETE
app.delete("/contacts/:firstName", (req, res) => {
  // check if contact exist for update
  const contact = contacts.find(
    eachContact => eachContact.name === req.params.firstName
  );
  if (!contact) {
    res.status(404).send("User not found");
  }

  // delete
  const index = contacts.indexOf(contact);
  // remove 1 object
  contacts.splice(index, 1);

  // return
  res.send(contacts);
});

// reusable error handling
function validateContact(name) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(name, schema);
}

// in different environment port is randomly assigned
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on Port ${port}`));
