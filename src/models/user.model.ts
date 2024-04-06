import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  displayName: String,
  username: String,
  password: String,
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
