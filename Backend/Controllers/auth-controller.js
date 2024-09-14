import AddUserModel from "../Model/auth-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const CreateUser = async (req, res) => {
  const { name, email, password, confirm } = req.body;
  try {
    const NewUser = await AddUserModel.findOne({ name: name });
    if (NewUser) {
      return res.status(400).json({ message: "User Already exist." });
    }

    if (password != confirm) {
      return res.status(400).json({ message: "Password Don't Match" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newAddUser = await AddUserModel.create({
      name,
      email,
      password: hashpassword,
      confirm,
    });
    //  const token = jwt.sign({name:newAddUser.name,id:newAddUser.id },'test');

    return res.status(200).json({ user: newAddUser, token });
  } catch (error) {
    console.error("Error Creating New User");
    return res.status(400).json("internal error");
  }
};


const logIn = async (req, res) => {
  try {
    const { name, password } = req.body;
    console.log(`Name: ${name} , Password: ${password}`);
    const NewUser = await AddUserModel.findOne({ name: name });

    if (!NewUser) {
      return res.status(404).json({ message: " Invalid account NO data " });
    }
    const isPasswordCorrect = await bcrypt.compare(password, NewUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password!" });
    } else {
      const token = jwt.sign(
        {
          name: NewUser.name,
          id: NewUser.id,
          isAdmin: NewUser.isAdmin,
          pending: NewUser.pending,
        },
        "test"
      );
      res.status(200).json({ result: NewUser, token });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export {
CreateUser,
  logIn,

};
