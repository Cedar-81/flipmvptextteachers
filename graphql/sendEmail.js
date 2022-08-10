const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");

const oauth2Client = new OAuth2(
  "775640691968-8922c8vtmcm3nd1il005r03ogu6dkcmp.apps.googleusercontent.co", // ClientID
  "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", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token:
    "1//04iwoLUXVibq2CgYIARAAGAQSNwF-L9Irilz-xh6bTT1sOrlGH7Gh9Ugw5bgshq3d6eY3YXuKlGZ5C9fmHAkQbQIeUycc4ERRvMQ",
});

const accessToken = oauth2Client.getAccessToken();

export default async function sendEmail(val) {
  //   await sendEmail1(val);
  await sendEmail1(val);
}

const sendEmail1 = async (val) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: `${process.env.NEXT_PUBLIC_APP_EMAIL}`.trim(),
        clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`.trim(),
        clientSecret: `${process.env.NEXT_PUBLIC_CLIENT_SECRET}`.trim(),
        refreshToken: `${process.env.NEXT_PUBLIC_REFRESH_TOKEN}`.trim(),
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Flip Classroom" <${process.env.NEXT_PUBLIC_APP_EMAIL}>`, // sender address
      to: `${val.to_email}`, // list of receivers
      subject: "Flip Classroom Email Verification", // Subject line
      // text: "Hello world?", // plain text body
      html: genHtmlText(val), // html body
    });
    console.log(info);
  } catch (e) {
    console.log(e);
    transporter.close();
    return e;
  }
};

const genHtmlText = (val) => {
  return `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,600;1,700;1,800;1,900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:wght@300&display=swap"
        rel="stylesheet"
      />
      <title>Flip Classroom Email Verification</title>
    </head>
    <body style="font-family: 'Fira Sans', sans-serif">
      <div
        style="
          height: max-content;
          width: 100%;
          background-color: rgb(27, 27, 27);
          text-align: center;
          color: white;
          padding: 2rem 0;
        "
      >
        <h2 style="">Email Verification</h2>
        <h3 style="width: 90%; margin: auto; font-size: small">
          This is an email verification code from flip classroom, if you didn't
          signup for this please ignore
        </h3>
        <p style="font-size: 50px">Code: ${val.message}</p>
      </div>
    </body>
  </html>
    `;
};
