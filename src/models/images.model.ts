import mongoose from "mongoose";
const { Schema } = mongoose;

const auditSchema = new Schema(
  {
    path: String,
    fileName: String,
    title:String,
    subTitle:String
  },
  { timestamps: true }
);

export default  mongoose.model("Image", auditSchema);
