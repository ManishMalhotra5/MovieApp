import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    userName : {
      type: String,
      required : true,
      unique : true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passcode: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String
    },
    profilePic : {
      type : String
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("passcode"))
    return next;
  this.passcode = await bcrypt.hash(this.passcode, 10);
  next();
})

userSchema.methods.isPasscodeCorrect = async function (passcode) {
  return await bcrypt.compare(passcode, this.passcode);
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id : this._id,
      email: this.email
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EX
    }

  )
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EX
    }
  )
}

export const User = mongoose.model("User", userSchema);
