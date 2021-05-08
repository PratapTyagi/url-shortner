import mongoose from "mongoose";
import config from "config";

const db = config.get("mongoURI");

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDb;
