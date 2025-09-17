import mongoose from "mongoose";

const companySize = [
  "1-20",
  "21-50",
  "51-100",
  "101-200",
  "201-500",
  "501-1000",
  ">1000",
];

const contactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, "Please enter your contact number"],
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v);
        },
      },
      message: "Please enter a valid 10-digit mobile number",
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    designation: {
      type: String,
      required: [true, "Please enter your designation"],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Please enter your company name"],
      trim: true,
    },
    companySize: {
      type: String,
      required: [true, "Please enter your company size"],
      enum: {
        values: companySize,
        message: "Please select a valid company size",
      },
    },
    interestedIn: {
      type: String,
      required: [true, "Please enter your interested in"],
    },
    message: {
      type: String,
      required: [true, "Please enter your message"],
      maxlength: [500, "Message cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  },
);

const ContactUs =
  mongoose.models.contactUs || mongoose.model("contactUs", contactUsSchema);

export default ContactUs;
