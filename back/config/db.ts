import mongoose from "mongoose";
import env from "dotenv";
env.config();
const dbUrl = process.env.DB_URL as string;

export const dbConnection = () => {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Db connection established");
    })
    .catch((err: any) => {
      console.error(err);
    });
};
