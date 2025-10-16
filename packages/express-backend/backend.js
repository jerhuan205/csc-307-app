// backend.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  findAllUsers,
  findUserById,
  findUserByName,
  addUser,
  deleteUserById
} from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

// Adding a new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;

  addUser(userToAdd)
    .then((newUser) => res.status(201).json(newUser))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// GET format:  ./users
//              ./users?name=Mac
//              ./users?name=Mac&job=Professor
app.get("/users", (req, res) => {
  const name = req.query.name;

  const query = name ? findUserByName(name) : findAllUsers();

  query
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// GET id format:  ./users/zap555
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  findUserById(id)
    .then((user) => {
      if (user) res.status(200).json(user);
      else res.status(404).send("User not found.");
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// DELETE format: ./users/zap555
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  deleteUserById(id)
    .then((deletedUser) => {
      if (deletedUser) res.status(204).send(); // success, no content
      else res.status(404).send("User not found.");
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});