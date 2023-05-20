import mongoose from "mongoose";


const connectDb = ()=>{
    mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backendapi",
    })
    .then(() => console.log("Database connected successfully"))
    .catch((e) => console.log(e));
}

export default connectDb;