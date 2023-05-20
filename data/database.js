import mongoose from "mongoose";


const connectDb = ()=>{
    mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backendapi",
    })
    .then((c) => console.log(`Database connected successfully with ${c.connection.host}`))
    .catch((e) => console.log(e));
}

export default connectDb;