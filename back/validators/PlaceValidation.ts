import { Schema } from "express-validator";

export const addPlaceSchema: Schema = {
  title: {
    isString: true,
    errorMessage: "please provide a valid title",
  },
  description: {
    isString: true,
    errorMessage: "please provide a valid description",
  },
  extraInfo: {
    isString: true,
    errorMessage: "please provide a valid info",
  },
  address: {
    isString: true,
    errorMessage: "please provide a valid address",
  },
  checkOut: {
    isNumeric: true,
    errorMessage: "please provide a valid check Out time",
  },
  checkIn: {
    isNumeric: true,
    errorMessage: "please provide a valid check in time",
  },
  maxGuest: {
    isNumeric: true,
    errorMessage: "please provide a valid number for maximum guest number",
  },
  perks: { isArray: true },
  images: { isArray: true },
};

export const updatePlaceSchema: Schema = {
  title: {
    isString: true,
    errorMessage: "please provide a valid title",
  },
  description: {
    isString: true,
    errorMessage: "please provide a valid description",
  },
  extraInfo: {
    isString: true,
    errorMessage: "please provide a valid info",
  },
  address: {
    isString: true,
    errorMessage: "please provide a valid address",
  },
  checkOut: {
    isNumeric: true,
    errorMessage: "please provide a valid check Out time",
  },
  checkIn: {
    isNumeric: true,
    errorMessage: "please provide a valid check in time",
  },
  maxGuest: {
    isNumeric: true,
    errorMessage: "please provide a valid number for maximum guest number",
  },
  perks: { isArray: true },
  images: { isArray: true },
};
