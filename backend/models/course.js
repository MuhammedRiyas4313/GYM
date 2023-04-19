const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema(
  {
    coursename: {
      type: String,
      trim: true,
      required: true,
    },
    type:String,
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
    clients: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        paymentStatus: String,
        bookedSlote: String    
      },
    ],
    charge: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    cover1: {
      type: String,
    },
    cover2: {
      type: String,
    },
    introVideo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Course = mongoose.model("Course", CourseSchema);
