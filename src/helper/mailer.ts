import nodemailer from "nodemailer";

type EmailType = "VERIFY" | "CONTACT";

interface SendEmailProps {
  email: string;
  emailType: EmailType;
}

export const sendEmail = async ({ email, emailType }: SendEmailProps) => {
  try {
    if (!email || !emailType) {
      throw new Error("Both 'email' and 'emailType' are required.");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.example.com", // Replace with your SMTP host
      port: 587,
      secure: false, // true for 465, false for others (like 587)
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
      },
    });

    const subject =
      emailType === "VERIFY"
        ? "Verify Your Email"
        : "Thank You for Contacting Us!";

    const text =
      emailType === "VERIFY"
        ? "Please verify your email by clicking the link."
        : "Thank you for contacting us.";

    const html =
      emailType === "VERIFY"
        ? `<p>Please verify your email by clicking <a href="#">this link</a>.</p>`
        : `<p>Thank you for reaching out. We'll get back to you soon.</p>`;

    const mailOptions = {
      from: `"Your Name" <${process.env.FROM_EMAIL}>`, // use your env variable or hardcoded email
      to: email,
      subject,
      text,
      html,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", mailResponse.messageId);

    const previewUrl = nodemailer.getTestMessageUrl(mailResponse);
    if (previewUrl) {
      console.log("Preview URL: %s", previewUrl);
    }

    return mailResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error sending email:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Error sending email:", error);
      throw new Error("An unknown error occurred while sending email.");
    }
  }
};
