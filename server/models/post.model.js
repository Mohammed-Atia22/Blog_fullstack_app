const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [50, "Title cannot exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "createdBy is required"],
    }
  },
  {
    timestamps: true,
  }
);

postSchema.methods.toPublic = function () {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    image: this.image,
    createdAt: this.createdAt,
    createdBy: this.createdBy,
  };
};

module.exports = mongoose.model("Post", postSchema);