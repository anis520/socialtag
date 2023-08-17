import nodemailer from "nodemailer";
const sendEmail = async (to, subject, text) => {
  try {
    let transort = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.SEND_MAIL_USER,
        pass: process.env.SEND_MAIL_PASS,
      },
    });

    transort.sendMail({
      from: `Ecomerce${process.env.SEND_MAIL_USER}>`,
      to,
      subject,
      html: text,
    });
  } catch (error) {}
};
export default sendEmail;

export const resetpasswordtemplate = (username, clientPort, token) => {
  let templete = `<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Welcome Email</title>
</head>

<body   >
  <h2>Hello ${username}! </h2>
  <p>One time link ...</p>

  <img
  style="
    width: 20%;
    display: block;
    margin: 40px 0;
    border-radius: 10px;
    border: 2px solid gray;
  "
  src="https://www.paymentsjournal.com/wp-content/uploads/2020/08/man-forgot-his-password_173125-93.jpg"
  alt=""
/>
  
  <a style="
  background-color: rgba(24, 77, 221, 0.829);
  color: white;
  padding: 5px 50px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 10px;
" href='${clientPort}/resetpass/${token}'  target="_blank" >Verify</a>
  <p>Dont share or forword this email with anyone !! </p>
</body>
</html>`;

  return templete;
};

export const temppasswordtemplate = (username, email, temppass) => {
  let templete = `<!DOCTYPE html>

  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title>Welcome Email</title>
    </head>
 
    <body>
      <h2>Hello ${username}!</h2>
      <p>Dont share you temp password ...</p>
  
      <img
        style="
          width: 20%;
          display: block;
          margin: 40px 0;
          border-radius: 10px;
          border: 2px solid gray;
        "
        src="https://static.vecteezy.com/system/resources/previews/004/968/518/non_2x/don-t-share-one-time-password-otp-or-verification-code-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg"
        alt=""
      />
      <p style="font-weight: 800; color: gray">Your email</p>
      <div
        style="
          background-color: rgba(76, 120, 241, 0.493);
          color: white;
          padding: 5px 20px;
          display: inline;
          text-decoration: none;
          font-weight: bold;
          border-radius: 5px;
        "
      >
        <p
          style="
            padding: 2px 10px;
            background: white;
            color: black;
            letter-spacing: 5px;
            display: inline; 
          "
        >
${email}
        </p>
      </div>
      <p style="font-weight: 800; color: gray">Your password</p>
  
      <div
        style="
          background-color: rgba(76, 120, 241, 0.493);
          color: white;
          padding: 5px 20px;
          display: inline;
          text-decoration: none;
          font-weight: bold;
          border-radius: 5px;
        "
      >
        <p
          style="
            padding: 2px 10px;
            background: white;
            color: black;
            letter-spacing: 3px;
            display: inline;
          "
        >
${temppass}        </p>
      </div>
      <p>Dont share or forword this email with anyone !!</p>
    </body>
  </html>`;

  return templete;
};
