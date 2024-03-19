import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    maxLength: 50,
    minLength: 1,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    maxLength: 50,
    minLength: 1,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide phone number"],
    maxLength: 20,
    minLength: 5,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid password!`,
    },
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please provide date of birth"],
  },
}, { timestamps: true });

export default Mongoose.model("User", userSchema);
