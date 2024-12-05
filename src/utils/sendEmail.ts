import nodemailer from 'nodemailer';
import envConfig from '../config/env.config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: envConfig.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: envConfig.SMTP_USER_INFO.smtp_user,
      pass: envConfig.SMTP_USER_INFO.smtp_pass,
    },
  });

  await transporter.sendMail({
    from: 'raihan@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
