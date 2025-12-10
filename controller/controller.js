const db = require("../config/db");
const sendEmail = require("../utils/sendEmail");
const { subscriptionEmail } = require("../utils/emailTemplates");
const transporter = require("../utils/transporter");



exports.subscribe = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email || !name.trim() || !email.trim()) {
      return res.status(400).json({
        message: "Provide required fields!",
        success: false,
      });
    }
    const [user] = await db.query('SELECT id FROM subscribe WHERE email=? LIMIT 1', [email])

    if (user.length > 0) {
      return res.status(400).json({
        message: "You already subscribed-->Use another email for subscribe !",
        success: false,
      });
    }

    const [result] = await db.query(
      "INSERT INTO subscribe (name, email) VALUES (?, ?)",
      [name, email]
    );

    // Send Email
    await sendEmail(
      email,
      "Welcome to Botixbo 🚀",
      subscriptionEmail(name, email)
    );

    return res.status(201).json({
      message: "Subscribed successfully! Email sent ✔",
      success: true,
      data: {
        id: result.insertId,
        name,
        email,
      },
    });
  } catch (error) {
    console.log("SUBSCRIBE ERROR:", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
      error: error.message,
    });
  }
};

exports.contactUs = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required", success: false });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({ message: "Phone number is required", success: false });
    }

    const phoneDigits = phone.replace(/\D/g, "");
    let finalPhone = null;

    if (phoneDigits.length === 10) {
      finalPhone = phoneDigits;
    } else if (phoneDigits.length === 11 && phoneDigits.startsWith("0")) {
      finalPhone = phoneDigits.slice(1);
    } else if (phoneDigits.length === 12 && phoneDigits.startsWith("91")) {
      finalPhone = phoneDigits.slice(2);
    } else if (phoneDigits.length > 10) {
      finalPhone = phoneDigits.slice(-10);
    }

    if (!finalPhone || !/^[6-9]\d{9}$/.test(finalPhone)) {
      return res.status(400).json({
        message: "Enter a valid 10-digit Indian phone number",
        success: false
      });
    }

    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Valid email is required", success: false });
    }

    if (!subject || !subject.trim()) {
      return res.status(400).json({ message: "Subject is required", success: false });
    }

    if (!message || !message.trim() || message.trim().length < 10) {
      return res.status(400).json({
        message: "Message must be at least 10 characters",
        success: false
      });
    }


    const [result] = await db.query(
      'INSERT INTO contact (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, finalPhone, subject, message]
    );

    const mailOptions = {
      from: `"BOTIXBO Contact Alerts" <${process.env.SMTP_USER}>`,
      to: process.env.CEO_EMAIL,
      subject: `🚨 New Contact Request | ${name} (${phone})`,
      html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#f2f4f7; padding:20px;">
    
    <!-- HEADER BAR -->
    <div style="
      max-width:600px; 
      margin:auto; 
      background:#1a73e8;
      padding:14px 20px;
      border-radius:8px 8px 0 0;
      color:white;
      font-size:18px;
      font-weight:bold;
      letter-spacing:0.5px;
      text-align:center;">
      🚨 New Contact Submission Received
    </div>

    <!-- MAIN CARD -->
    <div style="
      max-width:600px; 
      margin:auto; 
      background:white; 
      padding:25px; 
      border-radius:0 0 8px 8px; 
      box-shadow:0 4px 10px rgba(0,0,0,0.1);
    ">
      
      <h2 style="margin:0 0 15px; color:#222; font-size:22px;">
        Someone is trying to reach you urgently!
      </h2>

      <!-- User Info Section -->
      <div style="margin-top:15px; font-size:16px; color:#444;">
        <p><strong>👤 Name:</strong> ${name}</p>
        <p><strong>📞 Phone:</strong> +91-${finalPhone}</p>
        <p><strong>📧 Email:</strong> ${email}</p>
        <p><strong>📝 Subject:</strong> ${subject}</p>
      </div>

      <hr style="margin:25px 0; border:none; border-bottom:1px solid #ddd;" />

      <!-- Message Box -->
      <div style="
        background:#f9fafc; 
        padding:15px; 
        border-left:4px solid #1a73e8; 
        font-size:16px; 
        white-space:pre-line;
        line-height:1.5;
        color:#333;
      ">
        <strong>📨 Message:</strong><br/>
        ${message}
      </div>

      <hr style="margin:25px 0; border:none; border-bottom:1px solid #eee;" />

      <p style="font-size:14px; color:#777; text-align:center;">
        Notification sent from <strong>BOTIXBO Official Website</strong><br/>
        Timestamp: ${new Date().toLocaleString()}
      </p>

    </div>
  </div>
  `,
    };


    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Message sent successfully! We’ll reach out soon.",
      success: true,
      data: { id: result.insertId }
    });

  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};


