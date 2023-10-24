import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const test = (req, res) => {
  res.send("Hello world");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "Can't validate account owner"));

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profileImg: req.body.profileImg,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "Can't validate account owner"));

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(password, 10);
    }

    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json(`User ${req.body} has been deleted!`);
  } catch (error) {
    next(error);
  }
};
