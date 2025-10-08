// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

// Generates a simple random string for IDs like "id123"
function generateId() {
  return "id" + Math.random().toString(16).slice(2, 8);
}

// Adding a new user
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  // generate random id to go alongside user
  userToAdd.id = generateId();

  addUser(userToAdd);
  res.status(201).json(userToAdd); // default response code: res.status(200).send()
});

// Finding a user by name
const findUsers = (name, job) => {
  let filtered = users["users_list"];

  // Check if name and job provided
  if (name) {
    filtered = filtered.filter((user) => user["name"] === name);
  }
  if (job) {
    filtered = filtered.filter((user) => user["job"] === job);
  }
  return { users_list: filtered };
};

// GET format:  ./users
//              ./users?name=Mac
//              ./users?name=Mac&job=Professor
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job  = req.query.job;

  let result = findUsers(name, job);
  res.send(result);
});

// Finding a user by ID
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

// GET format:  ./users/zap555
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


// Deleting user by ID, grabbing the index
const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1);
    return true;
  }
  return false;
};

// DELETE format: ./users/zap555
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const deleted = deleteUserById(id);

  if (deleted) {
    res.status(204).send(); // success, no content
  } else {
    res.status(404).send("User not found.");
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});