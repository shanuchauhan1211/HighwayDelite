import mongoose from "mongoose";

const URI = `mongodb+srv://shanu1211chauhan:Shancho1211@cluster0.qmsboiz.mongodb.net/?retryWrites=true&w=majority`;

const connectDb = async()=>{

try{
    mongoose.set('strictQuery', true);
    await mongoose.connect(URI);
    console.log("connection successfull");
}
catch(error) {

    console.error(`database connection failed \n Error: ${error}`);
    process.exit(0);
}

}

export default connectDb;