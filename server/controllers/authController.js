import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { sendMail } from "../utils/emailSender.js";
import { JWT_SECRET } from "../configs/auth.config.js";
import user from "../models/user.js";


export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "user does not exist" });
    }
    if(existingUser.status === "Pending"){
      return res.status(400).json({message: "please confirm your email"})
    }
    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (existingUser.status !== "Active") {
      return res
        .status(401)
        .json({ message: "Pending Account. Please Verify Your Email" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong during signIn" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 12);

    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "passwords don't match" });
    }

    const confirmationCode = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "1h" });

    const userResult = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      confirmationCode: confirmationCode,
    });

    const token = jwt.sign({ email: userResult.email, id: userResult._id}, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ result: userResult, token });
    sendMail(userResult.name, userResult.email, userResult.confirmationCode);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong during signUp: ${error}` });
  }
};

export const verifyEmail = async (req, res) => {
  const { confirmationCode } = req.params;

  try{
    const userWithCodeExists = await User.findOne({
    confirmationCode: confirmationCode,
  });

  if (userWithCodeExists) {
    userWithCodeExists.status = "Active";
    await userWithCodeExists.save();
    return res.status(200).json({ message: "Account is activated" });
  }

  res.status(404).json({ message: "User not found" });
  }catch(err){
    res.status().json({message: `Something went wrong during confirmation of email: ${err}`})
  }
};
