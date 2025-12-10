exports.subscriptionEmail = (name, email) => {
  const year = new Date().getFullYear();

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: Arial; background: #f5f7fa; }
        .box {
          max-width: 600px; margin: 40px auto; background: #fff;
          padding: 30px; border-radius: 12px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.08);
        }
        h1 { color: #1a73e8; text-align:center; }
        .content { margin-top: 20px; color:#444; line-height:1.6; }
        .footer { margin-top: 30px; text-align:center; font-size:13px; color:#888; }
      </style>
    </head>

    <body>
      <div class="box">
        <h1>Welcome to Botixbo 🚀</h1>

        <div class="content">
          <p>Hello <strong>${name}</strong>,</p>

          <p>Thank you for subscribing to <strong>Botixbo</strong>!</p>

          <p>
            You'll now receive updates about:<br/>
            • New features<br/>
            • Tech articles<br/>
            • Product launches<br/>
            • Company news
          </p>

          <p>Your subscription email: <strong>${email}</strong></p>

          <p>If you need help, contact:  
          <a href="mailto:support@botixbo.com">support@botixbo.com</a></p>

          <p>Welcome aboard 🚀</p>
          <p><strong>Team Botixbo</strong></p>
        </div>

        <div class="footer">© ${year} Botixbo. All rights reserved.</div>
      </div>
    </body>
  </html>
  `;
};
