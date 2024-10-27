import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailverification(token: string,email:string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email address",
      html: ` <div
      style="
        background-color: rgb(64, 64, 64);
        width: 200px;
        border-radius: 10px;
        justify-items: center;
        align-items: center;
        color: white;
        padding: 10px;
      "
    >
      <p style="font-weight: bold; display: block;">Welcome to authi service</p>
      <p>
        Click <a href="${`http://localhost:3000/newverification?token=${token}`}" style="color: orange">here </a>to confirm
        email.
      </p>
    </div>`,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function sendResetPasswordEmail(token: string,email:string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset password request",
      html: ` <div
      style="
        background-color: rgb(64, 64, 64);
        width: 200px;
        border-radius: 10px;
        justify-items: center;
        align-items: center;
        color: white;
        padding: 10px;
      "
    >
      <p style="font-weight: bold; display: block;">authi reset password request</p>
      <p>
        Click <a href="${`http://localhost:3000/newpassword?token=${token}`}" style="color: orange">here </a>to confirm
        reset request.
      </p>
    </div>`,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
