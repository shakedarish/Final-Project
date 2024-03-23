require("dotenv").config();
const nodemailer = require("nodemailer");

const ourEmail = process.env.EMAIL_ACCOUNT;
const emailPass = process.env.EMAIL_PASS;

const sendEmil = async (req, res) => {
  const { firstName, lastName, company, email, phoneNumber, message } =
    req.body;
  const mail = {
    from: `${email} <${ourEmail}>`,
    to: ourEmail,
    subject: "New massage from vidWizard",
    html: `
          <p> Name: ${firstName} ${lastName}</p>
          <p> Company: ${company}</p>
          <p> Phone Number: ${phoneNumber}</p>
          <p> Message: ${message}</p>
          `,
  };

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 456,
    secure: true,
    auth: {
      user: ourEmail,
      pass: emailPass,
    },
  });

  try {
    await transporter.sendMail(mail);
    console.info("Email sent from: " + email);
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
  res.status(200).json({ success: true });
};

module.exports = {
  sendEmil,
};
