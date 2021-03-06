import nodemailer from "nodemailer";

export default async function emailNewPassword(email: string, url: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    service: "yahoo",
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORDYAHOO,
    },
    debug: false,
    logger: true,
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "New Password",
    html: `
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td align="center">
                    <table
                        class="col-600"
                        width="600"
                        border="0"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                    >
                        <tbody>
                            <tr>
                                <td
                                    align="center"
                                    valign="top"
                                    bgcolor="#414858"
                                    style="background-size: cover; background-position: top"
                                >
                                    <table
                                        class="col-600"
                                        width="600"
                                        height="200"
                                        border="0"
                                        align="center"
                                        cellpadding="0"
                                        cellspacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td height="40"></td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="line-height: 0px">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    align="center"
                                                    style="
                                                        font-family: 'Raleway', sans-serif;
                                                        font-size: 37px;
                                                        color: #ffffff;
                                                        line-height: 24px;
                                                        font-weight: bold;
                                                        letter-spacing: 5px;
                                                    "
                                                >
                                                CHANGE
                                                    <span
                                                        style="
                                                            font-family: 'Raleway', sans-serif;
                                                            font-size: 37px;
                                                            color: #ffffff;
                                                            line-height: 39px;
                                                            font-weight: 300;
                                                            letter-spacing: 5px;
                                                        "
                                                        >PASSWORD!</span
                                                    >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    align="center"
                                                    style="
                                                        font-family: 'Lato', sans-serif;
                                                        font-size: 15px;
                                                        color: #ffffff;
                                                        line-height: 24px;
                                                        font-weight: 300;
                                                    "
                                                >
                                                    Forgot your password?
                                                </td>
                                            </tr>
                                            <tr>
                                                <td height="50"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <table
                        class="col-600"
                        width="600"
                        border="0"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                            margin-left: 20px;
                            margin-right: 20px;
                            border-left: 1px solid #dbd9d9;
                            border-right: 1px solid #dbd9d9;
                        "
                    >
                        <tbody>
                            <tr>
                                <td height="35"></td>
                            </tr>
                            <tr>
                                <td
                                    align="center"
                                    style="
                                        font-family: 'Raleway', sans-serif;
                                        font-size: 22px;
                                        font-weight: bold;
                                        color: #333;
                                    "
                                >
                                    To set a new password just click the link below
                                </td>
                            </tr>
                            <tr>
                                <td height="10"></td>
                            </tr>
                            <tr>
                                <td
                                    align="center"
                                    style="
                                        font-family: 'Lato', sans-serif;
                                        font-size: 14px;
                                        color: #757575;
                                        line-height: 24px;
                                        font-weight: 300;
                                        border-bottom: 1px solid grey;
                                        padding-bottom: 1em;
                                    "
                                >
                                    <a
                                        href="${url}"
                                        onMouseOver="this.style.color='#F3F9F6'"
                                        onMouseOut="this.style.color='#f3f9f6'"
                                        style="
                                            text-decoration: none;
                                            color: #f3f9f6;
                                            font-weight: 600;
                                        "
                                        ><div
                                            style="
                                                background: linear-gradient(
                                                    90.55deg,
                                                    #4ccfe4 0%,
                                                    #2ce6c8 99.9%
                                                );
                                                border-radius: 5.11111px;
                                                width: 8rem;
                                                padding: 0.5rem;
                                            "
                                        >
                                            Set New Password
                                        </div></a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return "Mail has been sent!";
  } catch {
    return "Something is wrong!";
  }
}
