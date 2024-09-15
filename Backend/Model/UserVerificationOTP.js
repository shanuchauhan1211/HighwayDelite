import mongoose from "mongoose";


const UserotpSchema = new mongoose.Schema({
userId: { type: String},
  otp: { type: String},
  createdAt: { type: Date},
  expireAt:{type:Date}
});

const UserotpModel = mongoose.model("OTP", UserotpSchema);

export default UserotpModel;
