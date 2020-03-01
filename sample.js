let userId = "5e56a741474a09f8c1c1075d";
const axios = require("axios");

try {
  const express = require("express");
  const app = express();
  const Joi = require("joi");
  app.use(express.json());

  axios({
    method: "put",
    url: "http://localhost:5000/api/errors/reset/" + userId,
    data: {
      errorCount: 0,
      errorLog: []
    }
  });

  // models is database
  // routes is routing
  // control is class/functional logic

  const contacts = [
    { id: 1, name: "larry" },
    { id: 2, name: "kenny" },
    { id: 3, name: "rachel" }
  ];

  app.get("/", (req, res) => {
    res.send("hello world");
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
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Listening on Port ${port}`));
} catch (err) {
  // console.log(err.constructor.name);
  // jake: 5e56a783474a09f8c1c1075e
  // joseph: 5e56a791474a09f8c1c1075f
  // james: 5e56a7a5474a09f8c1c10760
  axios({
    method: "put",
    url: "http://localhost:5000/api/errors/update/" + userId,
    data: {
      errorCount: 1,
      errorLog: err.stack
    }
  });
  console.log(err);
}
