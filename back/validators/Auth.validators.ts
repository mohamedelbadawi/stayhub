import { Schema } from "express-validator";

const registerValidatorSchema: Schema = {
  name: {
    isString: true,
    errorMessage: "please provide a valid name",
  },
  email: {
    isEmail: true,
    errorMessage: "please enter a valid email address",
  },
  password: {
    isLength: {
      options: { min: 8, max: 16 },
      errorMessage: "password must be at least 8 characters",
    },
  },
  phone: {
    isMobilePhone: true,
    errorMessage: "please enter a valid phone number",
  },
};
const loginValidatorSchema: Schema = {
  email: {
    isEmail: true,
    errorMessage: "please enter a valid email address",
  },
  password: {
    isLength: {
      options: { min: 8, max: 16 },
      errorMessage:
        "password must be at least 8 characters an maximum 16 characters",
    },
  },
};

const forgetPasswordValidatorSchema: Schema = {
  email: {
    isEmail: true,
    errorMessage: "please enter a valid email address",
  },
};
const resetPasswordValidatorSchema: Schema = {
  id: {
    isMongoId: true,
    errorMessage: "invalid link ",
  },
  token: {
    isString: true,
    errorMessage: "please enter the token",
  },
  password: {
    isStrongPassword: true,
    errorMessage:
      "password must be at least 8 characters , have character and symbols ",
  },
};

export {
  registerValidatorSchema,
  loginValidatorSchema,
  resetPasswordValidatorSchema,
  forgetPasswordValidatorSchema,
};
