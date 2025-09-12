import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
  contactAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  contactNo: {
    type: Number,
    max: [9999999999, "Contact number cannot be greater than 10 digits"],
    min: [4000000000, "Contact number cannot be less than 10 digits"],
    required: [true, "Please enter your contact number"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  designation: {
    type: String,
    required: [true, "Please enter your designation"],
  },
  companyName: {
    type: String,
    required: [true, "Please enter your company name"],
  },
  companySize: {
    type: String,
    required: [true, "Please enter your company size"],
  },
  intrestedIn: {
    type: String,
    required: [true, "Please enter your interested in"],
  },
  message: {
    type: String,
    required: [true, "Please enter your message"],
  },
});

const ContactUs =
  mongoose.models.contactUs || mongoose.model("contactUs", contactUsSchema);

export default ContactUs;
