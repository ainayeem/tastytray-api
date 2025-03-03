import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config";
import { TUser, UserModel } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["mealProvider", "customer"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));

  next();
});

// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// static method
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
