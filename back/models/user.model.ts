import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  resetToken: string;
  resetTokenExp: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    resetToken: { type: String, default: "" },
    resetTokenExp: { type: Date, default: null },
  },
  { timestamps: true }
);

// hash password before save
userSchema.pre<IUser>("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export { IUser, userModel };
