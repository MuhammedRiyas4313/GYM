const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema(
  {
    coursename: {
      type: String,
      trim: true,
      required: true,
    },
    type: String,
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
    },
    clients: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        paymentStatus: String,
        bookedSlote: String,
      },
    ],
    availableSlots: [
      {
        status: {
          type: String,
          default: "free",
        },
        slote: {
          type: String,
          default: "05:00am-06:00am",
        },
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        joined: {
          type: Date,
        },
        updations :[
          {
            month: String,
            payment: {
              type: Boolean,
              default:false
            },
            weight: Number,
            height: Number
          }
        ],
        attendance:[
          {
            date:Date,
            status:{
              type: String
            },
            reason:{
              type:String
            }
          }
        ]
      },
      {
        status: {
          type: String,
          default: "free",
        },
        slote: {
          type: String,
          default: "06:30am-07:30am",
        },
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        joined: {
          type: Date,
        },
        updations :[
          {
            month: String,
            payment: {
              type: Boolean,
              default:false
            },
            weight: Number,
            height: Number
          }
        ],
        attendance:[
          {

          }
        ]
      },
      {
        status: {
          type: String,
          default: "free",
        },
        slote: {
          type: String,
          default: "08:00am-09:00am",
        },
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        joined: {
          type: Date,
        },
        updations :[
          {
            month: String,
            payment: {
              type: Boolean,
              default:false
            },
            weight: Number,
            height: Number
          }
        ],
        attendance:[
          {

          }
        ]
      },
      {
        status: {
          type: String,
          default: "free",
        },
        slote: {
          type: String,
          default: "05:00pm-06:00pm",
        },
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        joined: {
          type: Date,
        },
        updations :[
          {
            month: String,
            payment: {
              type: Boolean,
              default:false
            },
            weight: Number,
            height: Number
          }
        ],
        attendance:[
          {

          }
        ],
      },
      {
        status: {
          type: String,
          default: "free",
        },
        slote: {
          type: String,
          default: "06:30pm-07:30pm",
        },
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        joined: {
          type: Date,
        },
        updations :[
          {
            month: String,
            payment: {
              type: Boolean,
              default:false
            },
            weight: Number,
            height: Number
          }
        ],
        attendance:[
          {

          }
        ]
      },
      {
        status: {
          type: String,
          default: "free",
        },
        slote: {
          type: String,
          default: "06:30pm-07:30pm",
        },
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        joined: {
          type: Date,
        },
        updations :[
          {
            month: String,
            payment: {
              type: Boolean,
              default:false
            },
            weight: Number,
            height: Number
          }
        ],
        attendance:[
          {

          }
        ]
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
