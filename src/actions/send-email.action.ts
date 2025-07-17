"use server";

import transporter from "@/lib/nodemailer";

const styles = {
  container:
    "max-width:500px;margin:20px auto;padding:20px;border:1px solid #DDD;",
  heading: "font-size:24px;color:#333;",
  paragraph: "font-size:16px",
  link: "display:inline-block;margin-top:15px;padding:10px 15px;background:#007BFF;color:#fff;text-decoration:none;border-radius:5px;",
};

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `BetterAuthBasic - ${subject}`,
    html: `
        <div style="${styles.container}">
            <h1 style="${styles.heading}">${subject}</h1>

            <p style="${styles.paragraph}">${meta.description}</p>
            
            <a href="${meta.link}" style="${styles.link}">Click here to continue</a>
        </div>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[sendEmail]", err);
    return { success: false };
  }
}
