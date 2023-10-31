// import { users } from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import { users } from "../models/UserSchema.js";

export const handleRegister = async (req, res) => {
  const { userName, phone, userEmail, password } = req.body;
  console.log(password);
  let existingUser;
  if ((existingUser = await users.findOne({ userEmail: userEmail }))) {
    res.status(500).json("User already exists");
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = new users({
        userName,
        phone,
        userEmail,
        password: passwordHash,
      });

      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
