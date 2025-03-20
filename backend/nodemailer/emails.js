import {
  CONTACT_US_EMAIL_TEMPLATE,
  CONTACT_US_EMAIL_TEMPLATE_COPY_TO_USER,
} from "./emailTemplates.js";

import { transporter, sender, adminEmail } from "./nodemailer.config.js";

export const contactUsEmail = async (email, name, query) => {
  try {
    const response = await transporter.sendMail({
      from: email, // Who sent it
      to: adminEmail,
      subject: `Query Mail by ${name}`,
      html: CONTACT_US_EMAIL_TEMPLATE.replace("{userName}", name)
        .replace("{userEmail}", email)
        .replace("{userMessage}", query),

      category: "Contact by user",
    });

   // console.log("Query sent successfully", response);
  } catch (error) {
    console.error(`Error sending query`, error);
    throw new Error(`Error sending query: ${error}`);
  }
};

export const sendCopyOfContactUsEmailToUser = async (email, name, query) => {
  try {
    const response = await transporter.sendMail({
      from: sender, // Who sent it
      to: email,
      subject: `Query Mail by ${name} (Copy)`,
      html: CONTACT_US_EMAIL_TEMPLATE_COPY_TO_USER.replaceAll(
        "{userName}",
        name
      )
        .replace("{userEmail}", email)
        .replace("{userMessage}", query),
      category: "Contact by user Copy to user",
    });

    //console.log("Query sent successfully", response);
  } catch (error) {
    console.error(`Error sending query`, error);
    throw new Error(`Error sending query: ${error}`);
  }
};
