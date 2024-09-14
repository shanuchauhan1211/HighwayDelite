import mongoose from "mongoose";


const connectDb = async()=>{

try{
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.URI);
    console.log("connection successfull");
}
catch(error) {

    console.error(`database connection failed \n Error: ${error}`);
    process.exit(0);
}

}

export default connectDb;