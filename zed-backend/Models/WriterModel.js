
import mongoose from "mongoose";

const writerSchema = new mongoose.Schema({
  name: { type: String, required: true,unique:true, },
  Enname: { type: String, required: true ,unique:true,},
  image: { type: String, required: true },
  bio: { type: String },
});

const Writer = mongoose.model("Writer", writerSchema);
export default Writer;
