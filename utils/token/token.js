import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const createToken = async (user) => {
  const token = await jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
      admin: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
  return token;
};
