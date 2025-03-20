
import { sendCopyOfContactUsEmailToUser,contactUsEmail } from "../nodemailer/emails.js";
export const contactUs = async (req, res) => {
  const { email, name, message } = req.body;

  try {
    await contactUsEmail(email, name, message);
    await sendCopyOfContactUsEmailToUser(email, name, message);
    res.status(200).json({
      success: true,
      message: "Query sent successfully",
      user: { name, email, message },
    });
  } catch (error) {
    console.error("Error sending query", error);
    res.status(500).json({ message: `Error sending query: ${error.message}` });
  }
};
