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
  required: [true, "Please provide a password"],
  minLength: [8, "Password must be at least 8 characters long"],
  validate: [
    {
      validator: function(v) {
        return /[a-z]/.test(v);
      },
      message: "Password must contain at least one lowercase letter"
    },
    {
      validator: function(v) {
        return /[A-Z]/.test(v);
      },
      message: "Password must contain at least one uppercase letter"
    },
    {
      validator: function(v) {
        return /\d/.test(v);
      },
      message: "Password must contain at least one digit"
    },
    {
      validator: function(v) {
        return /^(?=.*[a-zA-Z]).{8,}$/.test(v); // This is somewhat redundant due to minLength and checks above but kept for consistency
      },
      message: "Password must be at least 8 characters long and include letters"
    }
  ]
},
  dateOfBirth: {
    type: Date,
    required: [true, "Please provide date of birth"],
  },
}, { timestamps: true });

export default Mongoose.model("User", userSchema);
