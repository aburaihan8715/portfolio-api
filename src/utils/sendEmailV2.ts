import nodemailer from 'nodemailer';

import envConfig from '../config/env.config';

export const sendEmailV2 = async (
  to: string,
  html: string,
  text: string,
) => {
  // Configure the transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: envConfig.NODE_ENV === 'production',
    auth: {
      user: envConfig.SMTP_USER_INFO.smtp_user,
      pass: envConfig.SMTP_USER_INFO.smtp_pass,
    },
  });

  // Send the email
  await transporter.sendMail({
    from: 'raihan@gmail.com',
    to,
    subject: 'Reset password!',
    text, // Use the plain text version
    html, // Use the HTML version
  });
};
