
import mongoose from "mongoose";


const AddUserSchema = new mongoose.Schema({
  firstname: { type: String, required: true, default: "" },
  lastname:{type:String , required:true,default:""},
  email: { type: String, required: true, default: "" },
  password: { type: String, required: true, default: "" },
  verified:{type: Boolean ,default:false}
});

const AddUserModel = mongoose.model("AddUser", AddUserSchema);

export default AddUserModel;
