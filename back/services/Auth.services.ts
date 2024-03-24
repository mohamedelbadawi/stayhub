import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { IUser, userModel } from "../models/user.model";

class AuthServices {
  async createUser(userData: IUser) {
    return await userModel.create(userData);
  }

  generateJwtToken(
    userData: { email: string; id: string; role: string },
    expire: string
  ) {
    const token = jwt.sign(
      {
        email: userData.email,
        id: userData.id,
        role: userData.role,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: expire,
      }
    );
    return token;
  }
  async getUserByEmail(email: string) {
    return await userModel.findOne({ email: email });
  }
  async getUserById(id: string, select?: string) {
    return await userModel.findOne({ _id: id }).select(select ?? "");
  }
  generateResetToken() {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }
  // reset password

  async updateUserWithToken(id: string, token: string, tokenExp: Date) {
    return await userModel.updateOne(
      { _id: id },
      { resetToken: token, resetTokenExp: tokenExp }
    );
  }
  async updateUser(id: string, data: any) {
    return await userModel.updateOne({ _id: id }, data);
  }
  decodeToken = (token: string) => {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    return verified;
  };
}
export const authServices = new AuthServices();
