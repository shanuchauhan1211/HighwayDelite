import express from "express";
import cors from "cors";

import User from "./Routes/auth-router.js";
import connectDb from "./Utils/utils.js";
const app = express();
app.use(express.json({limit:'50mb'}));
app.use(cors());

app.use("/User",User);

const PORT = 5000;
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port : ${PORT}`);
})

});