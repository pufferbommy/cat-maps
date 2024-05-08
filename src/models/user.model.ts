import mongoose, { Schema, models } from "mongoose";

interface IUser {
  username: string;
  password: string;
}

const userSchema = new Schema({
  username: String,
  password: String,
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
