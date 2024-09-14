import AddUserModel from "../Model/auth-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const CreateUser = async (req, res) => {
  const {firstname, lastname, password ,email} = req.body;
  console.log(req.body);
  try {
    const NewUser = await AddUserModel.findOne({ firstname: firstname ,lastname:lastname });
    if (NewUser) {
      return res.status(400).json({ message: "User Already exist." });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newAddUser = await AddUserModel.create({
      firstname,
      lastname,
      email,
      password: hashpassword,
    });
    //  const token = jwt.sign({name:newAddUser.name,id:newAddUser.id },'test');

    return res.status(200).json({ user: newAddUser });
  } catch (error) {
    console.error(error);
    return res.status(400).json("internal error");
  }
};


const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Email: ${email} , Password: ${password}`);
    const NewUser = await AddUserModel.findOne({ email:email });

    if (!NewUser) {
      return res.status(404).json({ message: " Invalid account NO data " });
    }
    const isPasswordCorrect = await bcrypt.compare(password, NewUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password!" });
    } else {
      const token = jwt.sign(
        {
          firstname: NewUser.firstname,
          lastname: NewUser.lastname,
          email: NewUser.email,
          id: NewUser.id,
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
