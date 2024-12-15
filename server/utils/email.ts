import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendMeetingConfirmation(
  userEmail: string,
  userName: string,
  startTime: Date,
  endTime: Date,
  topic: string
) {
  const userEmailContent = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Meeting Confirmation with Miguel Taveras',
    html: `
      <h2>Meeting Confirmation</h2>
      <p>Dear ${userName},</p>
      <p>Your meeting with Miguel Taveras has been confirmed for:</p>
      <p><strong>Date:</strong> ${startTime.toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}</p>
      <p><strong>Topic:</strong> ${topic}</p>
      <p>A calendar invitation will be sent shortly.</p>
      <p>Best regards,<br>Miguel Taveras</p>
    `
  };

  const adminEmailContent = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Meeting: ${userName} - ${startTime.toLocaleDateString()}`,
    html: `
      <h2>New Meeting Scheduled</h2>
      <p><strong>With:</strong> ${userName} (${userEmail})</p>
      <p><strong>Date:</strong> ${startTime.toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}</p>
      <p><strong>Topic:</strong> ${topic}</p>
    `
  };

  await Promise.all([
    transporter.sendMail(userEmailContent),
    transporter.sendMail(adminEmailContent)
  ]);
}
