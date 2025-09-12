import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType }) => {
  try {
    if (!email) throw new Error("Email and emailType are required");
    // create reusable transporter object using the default SMTP transport

    // if(){}

    const transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mainOptions = {
      from: "amit23kumar04@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your email"
          : "Thank You for Contacting Us!",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    };

    const mailResponse = await transporter.sendMail(mainOptions);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailResponse));

    return mailResponse;
    //
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
