import nodemailer from "nodemailer";
import { config } from "dotenv";
import { emailTempelate } from "./emailTempelate.js";

config();

const pass = process.env.EMAIL_API_KEY;
const email = process.env.EMAIL_DOMAIN;
export const SendEmail = async (to, activeLink) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      secure: true,
      port: 465,
      auth: {
        user: "resend",
        pass,
      },
    });
    const info = await transporter.sendMail({
      from: `support@${email}`,
      to,
      subject: "Hello World",
      html: emailTempelate(activeLink),
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};
