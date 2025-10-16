import { User } from "./users.js";

// Find all users
export const findAllUsers = () => {
  return User.find();
};

// Find user by ID
export const findUserById = (id) => {
  return User.findById(id);
};

// Find users by name (case-insensitive)
export const findUserByName = (name) => {
  return User.find({ name: new RegExp(name, "i") });
};

// Find users by BOTH name and job
export const findUserByNameAndJob = (name, job) => {
  const query = {};
  if (name) query.name = new RegExp(name, "i");
  if (job) query.job = new RegExp(job, "i");
  return User.find(query);
};

// Add a new user
export const addUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

// Delete user by ID
export const deleteUserById = (id) => {
  return User.findByIdAndDelete(id);
};
