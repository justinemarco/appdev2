const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

const sendEmail = async (book) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const templatePath = path.join(__dirname, '../views/bookCreated.pug');
    const html = pug.renderFile(templatePath, {
      title: book.title,
      author: book.author,
      year: book.year || 'Unknown',
    });

    await transporter.sendMail({
      from: `"Book API" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: 'New Book Created',
      html,
    });

    console.log('Email sent!');
  } catch (err) {
    console.error('Failed to send email:', err);
  }
};

module.exports = sendEmail;
