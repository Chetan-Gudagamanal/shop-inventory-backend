import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from "../models/UserSchema.js";

export const handleLogin = async (req, res) => {
  const { userEmailOrPhone, password } = req.body;
  let user;
  try {
    user =
      (await users.findOne({ userEmail: userEmailOrPhone })) ||
      (await users.findOne({ phone: userEmailOrPhone }));
    if (user) {
      console.log(user);
      const flag = await bcrypt.compare(password, user.password);
      if (!flag) {
        res.status(500).json("Invalid credentials");
      } else {
        const payload = {
          id: user._id,
        };
        const auth_key = process.env.AUTH_KEY || "auth_key";
        const token = jwt.sign(payload, auth_key);

        res.status(200).json({ token: token, userData: user });
      }
    } else {
      res.status(500).json("Invalid credentials");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
