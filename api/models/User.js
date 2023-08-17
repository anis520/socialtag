import mongoose from "mongoose";

// adress types objects
const AddressSchema = new mongoose.Schema({
  address: String,
  type: Number,
});

// schema
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,

      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },
    follow: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },

    photo: {
      type: String,
      default: null,
    },
    cover: { type: String, default: null },
    isverfied: {
      type: Boolean,
      default: false,
    },

    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// export model
export default mongoose.model("User", userSchema);
