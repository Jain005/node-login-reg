const User = require("../models/user");

const registrationSchema = {
  password: {
    isStrongPassword: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    errorMessage:
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
  },
  email: {
    notEmpty: {
      errorMessage: "Email not will empty",
    },
    isEmail: {
      errorMessage: "Please enter correct email",
    },
    custom: {
      options: (value) => {
        return User.find({
          email: value.toLowerCase(),
        }).then((user) => {
          if (user.length > 0) {
            return Promise.reject("Email address already taken");
          }
        });
      },
    },
  },
};

const loginSchema = {
  password: {
    isStrongPassword: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    errorMessage:
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
  },
  email: {
    notEmpty: {
      errorMessage: "Email not will empty",
    },
    isEmail: {
      errorMessage: "Please enter correct email",
    },
  },
};

const verifySignup = {
  registrationSchema,
  loginSchema,
};

module.exports = verifySignup;
