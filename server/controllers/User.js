import dotenv from "dotenv";
import StatusCodes from "http-status-codes";
import mongoose from "mongoose";
import User from "../models/User.js";
dotenv.config();

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.status(StatusCodes.OK).json({ data: users, count: users.length });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

export const getAllFilteredUsers = async (req, res) => {
  const { page, pageSize, startDate, endDate } = req.query;

  const LIMIT = pageSize ? parseInt(pageSize, 10) : 10;
  const startIndex = (Number(page) - 1) * LIMIT;

  // Initialize an empty filter object
  let filter = {};

  // Build the date filter if both startDate and endDate are provided
  if (startDate && endDate) {
    filter.dateOfBirth = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  try {
    const total = await User.countDocuments(filter);

    const users = await User.find(filter).limit(LIMIT).skip(startIndex).sort({ _id: -1 });

    res.status(StatusCodes.OK).json({
      data: users,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
      count: users.length,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "No available users" });
  }
};

// create user
export const createUser = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password, dateOfBirth } =
    req.body;

  // Create a new user instance with the request body
  const newUser = new User({
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    dateOfBirth,
  });

  try {
    // Save the new user, leveraging Mongoose's built-in validation
    await newUser.save();
    res.status(StatusCodes.CREATED).json({ data: newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      // Collect all validation errors
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Validation error", errors });
    }

    // Handle other potential errors
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { id: _id } = req.params; // Assuming the user's ID is passed as a URL parameter
  const { firstName, lastName, phoneNumber, email, password, dateOfBirth } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(StatusCodes.NOT_FOUND).send(`No user with id: ${_id}`);
  }

  const updatedUser = {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    dateOfBirth,
  };

  try {
    // Update the user, leveraging Mongoose's built-in validation
    const result = await User.findByIdAndUpdate(_id, updatedUser, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).send(`No user with id: ${_id}`);
    }
    res.status(StatusCodes.OK).json({ data: result });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      // Collect all validation errors
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Validation error", errors });
    }

    // Handle other potential errors
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

//get single user
export const getSingleUser = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(StatusCodes.NOT_FOUND).send(`No user with id: ${_id}`);
  }

  try {
    const user = await User.findById(_id);
    res.status(StatusCodes.OK).json({ data: user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

//Delete user
export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(StatusCodes.NOT_FOUND).send(`No user with id: ${_id}`);
  } else {
    await User.findByIdAndDelete(_id);
  }
  res.status(StatusCodes.OK).send("User was deleted Successfully");
};
