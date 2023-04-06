const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Contacts = require("./models/contacts");

mongoose.connect(
  "mongodb+srv://20220241:W6038QarscqS1wlr@contacts.ghlxkqi.mongodb.net/list"
);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

app.use(bodyParser.json());

const router = (route) => {
  route.get("/", async (req, res) => {
    try {
      const contactos = await Contacts.find();
      res.json(contactos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  route.post("/agregar", async (req, res) => {
    const contact = new Contacts({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
    });
    try {
      const newContact = await contact.save();
      res.status(201).json(newContact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

router(app);

app.listen(3000, () => {
  console.log("Server Running Succesfully!");
});
