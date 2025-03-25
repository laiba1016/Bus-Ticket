require('dotenv').config();

const nodemailer = require('nodemailer');

const Contact = require('../models/contactus');

const submitContact = async (req, res) => {
  try {
    const { fullname, email, message } = req.body;

    const newContact = new Contact({
      fullname,
      email,
      message
    });

    await newContact.save();


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'fitntone3@gmail.com',
      subject: `New Contact Form Submission from ${fullname}`,
      text: `You have received a new message from ${fullname} (${email}):\n\nMessage: ${message}`
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);
      }
    });


    res.status(201).json({
      success: true,
      message: 'Contact submitted successfully and email sent!'
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  submitContact
};
