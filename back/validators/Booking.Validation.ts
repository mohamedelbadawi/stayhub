import { Schema } from "express-validator";

export const addBookingSchema: Schema = {
  fullName: {
    isString: true,
    errorMessage: "please provide a valid full name",
  },
  phone: {
    isString: true,
    errorMessage: "please provide a valid phone number",
  },
  checkOut: {
    isDate: true,
    errorMessage: "please provide a valid check Out time",
  },
  checkIn: {
    isDate: true,
    errorMessage: "please provide a valid check in time",
  },
  guests: {
    isNumeric: true,
    errorMessage: "please provide a valid number for guest number",
  },
  place: {
    isMongoId: true,
    errorMessage: "please provide a valid if for place",
  },
};
export const updateBookingSchema: Schema = {
  status: {
    isString: true,
    // custom: {
    //   options: (val) => {
    //     console.log(val);
    //     return ["canceled", "approved"].includes(val);
    //   },
    // },
    errorMessage: "please check the status",
  },
};
