const transporter = require("./transporter");

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Botixbo" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (err) {
    console.log("Email send error:", err.message);
    throw new Error("Email failed to send!");
  }
};

module.exports = sendEmail;
