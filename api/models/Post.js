import mongoose from "mongoose";

//schema
const postSchema = mongoose.Schema(
  {
    posterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    photo: {
      type: String,
      trim: true,
      default: null,
    },
    like: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    comment: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Commnet",
    },
  },
  {
    timestamps: true,
  }
);

///exprot model

export default mongoose.model("Post", postSchema);
